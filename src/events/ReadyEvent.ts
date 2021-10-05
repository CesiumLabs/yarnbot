import type { Client } from "discord.js";
import logger from "../logger";

export default class {
    public name = "ready";

    async execute(client: Client) {
        logger.info(`Logged in to discord as ${client.user.tag}!`);

        await client.user.setPresence({
            status: "dnd",
            activities: [
                {
                    type: "COMPETING",
                    name: "Stranger Things"
                }
            ]
        });
    }
}
