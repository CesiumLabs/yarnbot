import { inject, injectable } from "tsyringe";
import { Client, MessageEmbed } from "discord.js";
import { SlashCommand, SlashCreator, CommandContext } from "slash-create";
import logger from "../../logger";
import { ClientToken } from "../../Constants";

@injectable()
export default class extends SlashCommand {
    constructor(public creator: SlashCreator, @inject(ClientToken) public client: Client) {
        super(creator, {
            name: "ping",
            description: "Ping Pong?"
        });
    }

    onError(err: Error) {
        logger.error(err.message, err.stack);
    }

    async run(ctx: CommandContext) {
        await ctx.defer();
        const timeout = Date.now() - ctx.invokedAt;
        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle("Ping - Pong")
            .setColor("RANDOM")
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(`⏱️ | Pong! Took \`${timeout}ms\``);

        return await ctx.sendFollowUp({ embeds: [embed.toJSON()] });
    }
}
