import { ApplicationCommandData } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums.js";

export = {
    name: "docs",
    description: "Get documentation for some libraries.",
    options: [
        {
            name: "library",
            required: true,
            type: ApplicationCommandOptionTypes.STRING,
            description: "The library to get docs for",
            choices: [
                {
                    name: "Discord.js",
                    value: "discord.js"
                },
                {
                    name: "Canvacord",
                    value: "canvacord"
                },
                {
                    name: "Discord Player",
                    value: "discord-player"
                },
                {
                    name: "Quick Economy",
                    value: "quick.eco"
                },
                {
                    name: "QuickMongo",
                    value: "quickmongo"
                },
                {
                    name: "SoundCloud Scraper",
                    value: "soundcloud-scraper"
                }
            ]
        },
        {
            name: "query",
            description: "The search query",
            type: ApplicationCommandOptionTypes.STRING,
            required: true
        }
    ]
} as ApplicationCommandData;
