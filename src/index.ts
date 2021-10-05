import "reflect-metadata";
import { config } from "dotenv";
import { container } from "tsyringe";
import Database from "./database/db";
import { DatabaseToken, ClientToken } from "./Constants";
import { Client, Intents } from "discord.js";
import { SlashCreator, GatewayServer, SlashCommand } from "slash-create";
import readdirp from "readdirp";
import logger from "./logger";

config();
const db = new Database();
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});
const slashCreator = new SlashCreator({
    applicationID: process.env.DISCORD_ID,
    publicKey: process.env.DISCORD_PUB_KEY,
    token: process.env.DISCORD_TOKEN
});

container.register(ClientToken, { useValue: client });
container.register(DatabaseToken, { useValue: db });

slashCreator.withServer(new GatewayServer((handler) => client.ws.on("INTERACTION_CREATE", handler)));

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
        for await (const command of commands) {
            const file = container.resolve<SlashCommand>(await import(command.fullPath).then((x) => x.default));
            logger.info(`Registering command: ${command.basename}`);
            slashCreator.registerCommand(file);
        }

        for await (const event of events) {
            const EventFile = await import(event.fullPath).then((x) => x.default);
            logger.info(`Registering event: ${event.basename}`);
            const ev = new EventFile();
            client.on(ev.name, ev.execute.bind(ev));
        }

        await slashCreator.syncCommands();
        await client.login();
    } catch (e) {
        const err = e as Error;
        logger.error(err.message, err.stack);
    }
}
