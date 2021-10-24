import { inject, injectable } from "tsyringe";
import { Client, MessageEmbed, CommandInteraction } from "discord.js";
import { symClient } from "../../Constants";
import BaseCommand from "../../utils/BaseCommand";
import { Doc, Library } from "snowflake-studio-docs";

@injectable()
export default class extends BaseCommand {
    constructor(@inject(symClient) public client: Client) {
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
