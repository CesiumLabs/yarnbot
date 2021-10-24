import { Client, MessageEmbed, CommandInteraction } from "discord.js";
import BaseCommand from "../../utils/BaseCommand";
import { Doc, Library } from "snowflake-studio-docs";

export default class extends BaseCommand {
    constructor() {
        super({
            name: "docs"
        });
    }

    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        const library = interaction.options.getString("library") as Library;
        const query = interaction.options.getString("query");
        await Doc.fetch(library)
            .then((r) => r.resolveEmbed(query, { excludePrivateElements: true }))
            .then((embed) =>
                interaction.followUp({
                    embeds: [embed as unknown as MessageEmbed]
                })
            );
    }
}
