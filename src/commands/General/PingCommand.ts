import { inject, injectable } from "tsyringe";
import { Client, MessageEmbed, CommandInteraction } from "discord.js";
import { symClient, COLORS } from "../../Constants";
import BaseCommand from "../../utils/BaseCommand";

@injectable()
export default class extends BaseCommand {
    constructor(@inject(symClient) public client: Client) {
        super({
            name: "ping"
        });
    }

    async execute(interaction: CommandInteraction) {
        await interaction.deferReply({
            ephemeral: interaction.options.getBoolean("hidden")
        });

        const timeout = Date.now() - interaction.createdTimestamp;
        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle("Bot Latency")
            .setColor(COLORS.NORMAL)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(`⏱️ | Pong! Took \`${timeout}ms\``);

        await interaction.followUp({ embeds: [embed] });
    }
}
