import { inject, injectable } from "tsyringe";
import { Client, TextChannel } from "discord.js";
import { SlashCommand, SlashCreator, CommandContext } from "slash-create";
import logger from "../../logger";
import { ClientToken } from "../../Constants";
import YarnBotUtils from "../../utils/YarnBotUtils";

@injectable()
export default class extends SlashCommand {
    constructor(public creator: SlashCreator, @inject(ClientToken) public client: Client) {
        super(creator, {
            name: "ask",
            description: "ask something?"
        });
    }

    onError(err: Error) {
        logger.error(err.message, err.stack);
    }

    async run(ctx: CommandContext) {
        await ctx.defer();
        const res = await YarnBotUtils.prompt(this.client.channels.resolve(ctx.channelID) as TextChannel, "Do you want to confirm this?", ctx.user.id);
        return;
        await ctx.sendFollowUp(res ? "Success!" : "Failed!");
    }
}
