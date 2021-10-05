import "reflect-metadata";
import { config } from "dotenv";
import { container } from "tsyringe";
import Database from "./database/db";
import { DatabaseToken, ClientToken, CommandsToken } from "./Constants";
import { Client, Collection, Intents } from "discord.js";
import readdirp from "readdirp";
import logger from "./logger";
import deployCommands from "./deployCommands";
import BaseCommand from "./utils/BaseCommand";
import BaseEvent from "./utils/BaseEvent";

config();
const db = new Database();
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});
const commandsCache = new Collection<string, BaseCommand>();

container.register(ClientToken, { useValue: client });
container.register(DatabaseToken, { useValue: db });
container.register(CommandsToken, { useValue: commandsCache });

const commands = readdirp(`${__dirname}/commands`, {
    fileFilter: ["*.js"],
    directoryFilter: ["!utils"]
});

const events = readdirp(`${__dirname}/events`, {
    fileFilter: ["*.js"],
    directoryFilter: ["!utils"]
});

registerCE();

async function registerCE() {
    try {
        await deployCommands();

        for await (const command of commands) {
            const file = container.resolve<BaseCommand>(await import(command.fullPath).then((x) => x.default));
            logger.info(`Registering command: ${file.config.name}`);
            commandsCache.set(file.config.name, file);
        }

        for await (const event of events) {
            const ev = container.resolve<BaseEvent>(await import(event.fullPath).then((x) => x.default));
            logger.info(`Registering event: ${ev.name}`);
            client.on(ev.name, ev.execute.bind(ev));
        }

        await client.login();
    } catch (e) {
        const err = e as Error;
        logger.error(err.message, err.stack);
    }
}
