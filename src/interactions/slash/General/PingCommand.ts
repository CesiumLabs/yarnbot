import { ApplicationCommandData } from "discord.js";

export = {
    name: "ping",
    description: "Shows bot latency",
    options: [
        {
            name: "hidden",
            required: false,
            type: "BOOLEAN",
            description: "Creates hidden response"
        }
    ]
} as ApplicationCommandData;
