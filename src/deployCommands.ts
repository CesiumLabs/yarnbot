import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { ApplicationCommandData } from "discord.js/typings/index.js";
import readdirp from "readdirp";
import logger from "./logger";

export default async function DeployCommands() {
    const rest = new REST({
        version: "9"
    }).setToken(process.env.DISCORD_TOKEN);

    try {
        logger.info("Reading application [/] commands data.");

        const commands: ApplicationCommandData[] = [];
        const rawCommands = readdirp(`${__dirname}/interactions`, {
            fileFilter: ["*.js"]
        });

        for await (const interactionCommand of rawCommands) {
            const data = (await import(interactionCommand.fullPath)) as ApplicationCommandData;
            commands.push(data);
        }

        logger.info("Successfully read application [/] commands data.");
        logger.info("Started refreshing application [/] commands.");

        await rest.put(Routes.applicationCommands(process.env.DISCORD_ID), {
            body: commands
        });

        logger.info("Successfully reloaded application [/] commands.");
    } catch (error) {
        logger.error((error as Error).stack);
    }
}
