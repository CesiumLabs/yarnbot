import { MessageEmbed, ContextMenuInteraction, DynamicImageFormat } from "discord.js";
import { COLORS } from "../../../../Constants";
import BaseCommand from "../../../../utils/BaseCommand";

export default class extends BaseCommand {
    constructor() {
        super({
            name: "Avatar"
        });
    }

    async execute(interaction: ContextMenuInteraction) {
        await interaction.deferReply({
            ephemeral: true
        });

        const user = interaction.options.getUser("user");
        const avatars = (["gif", "jpeg", "png", "webp"] as DynamicImageFormat[]).map((m) => {
            return [m.toUpperCase(), user.displayAvatarURL({ format: m, size: 4096 })];
        });

        const embed = new MessageEmbed()
            .setTimestamp()
            .setAuthor(user.tag, user.displayAvatarURL())
            .setTitle("Avatar")
            .setColor(COLORS.NORMAL)
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setDescription(avatars.map(([m, n]) => `[${m}](${n})`).join(" | "));

        await interaction.followUp({ embeds: [embed] });
    }
}
