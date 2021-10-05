import { CommandInteraction, ContextMenuInteraction } from "discord.js/typings/index.js";

export default class BaseCommand {
    constructor(public readonly config: { name: string; description?: string }) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public execute(interaction: CommandInteraction | ContextMenuInteraction) {
        return;
    }
}
