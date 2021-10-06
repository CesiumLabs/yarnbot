import { MessageEmbed, ContextMenuInteraction } from "discord.js";
import { COLORS } from "../../../../Constants";
import BaseCommand from "../../../../utils/BaseCommand";

export default class extends BaseCommand {
    constructor() {
        super({
            name: "Count Characters"
        });
    }

    async execute(interaction: ContextMenuInteraction) {
        const message = interaction.options.getMessage("message");
        const count = message.content?.length ?? 0;

        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle("Message Characters Count")
            .setColor(COLORS.NORMAL)
            .setAuthor(message.author.username)
            .setDescription(message.content || "**No content available!**")
            .setFooter(`Total ${count} character${count === 1 ? "" : "s"}`);

        await interaction.followUp({ embeds: [embed], ephemeral: true });
    }
}
