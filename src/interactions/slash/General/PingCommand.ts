import { ApplicationCommandData } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums.js";

export = {
    name: "ping",
    description: "Shows bot latency",
    options: [
        {
            name: "hidden",
            required: false,
            type: ApplicationCommandOptionTypes.BOOLEAN,
            description: "Creates hidden response"
        }
    ]
} as ApplicationCommandData;
