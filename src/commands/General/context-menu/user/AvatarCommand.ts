import { inject, injectable } from "tsyringe";
import { Client, MessageEmbed, ContextMenuInteraction, GuildMember, DynamicImageFormat } from "discord.js";
import { ClientToken, COLORS } from "../../../../Constants";
import BaseCommand from "../../../../utils/BaseCommand";

@injectable()
export default class extends BaseCommand {
    constructor(@inject(ClientToken) public client: Client) {
        super({
            name: "Avatar"
        });
    }

    async execute(interaction: ContextMenuInteraction) {
        await interaction.deferReply({
            ephemeral: true
        });

        const member = interaction.options.getMember("user") as GuildMember;
        const avatars = (["gif", "jpeg", "png", "webp"] as DynamicImageFormat[]).map((m) => {
            return [m.toUpperCase(), member.user.displayAvatarURL({ format: m, size: 4096 })];
        });

        const embed = new MessageEmbed()
            .setTimestamp()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle("Avatar")
            .setColor(COLORS.NORMAL)
            .setImage(member.user.displayAvatarURL({ size: 4096 }))
            .setDescription(avatars.map(([m, n]) => `[${m}](${n})`).join(" | "));

        await interaction.followUp({ embeds: [embed] });
    }
}
