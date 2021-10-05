import { Client, Constants } from "discord.js";
import logger from "../logger";
import BaseEvent from "../utils/BaseEvent";

export default class extends BaseEvent {
    constructor() {
        super({
            name: Constants.Events.CLIENT_READY
        });
    }

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
