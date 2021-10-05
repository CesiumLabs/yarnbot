import { Collection, Constants, Interaction } from "discord.js";
import { inject, injectable } from "tsyringe";
import { CommandsToken } from "../Constants";
import BaseCommand from "../utils/BaseCommand";
import BaseEvent from "../utils/BaseEvent";

@injectable()
export default class extends BaseEvent {
    constructor(@inject(CommandsToken) public commands: Collection<string, BaseCommand>) {
        super({
            name: Constants.Events.INTERACTION_CREATE
        });
    }

    async execute(interaction: Interaction) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const command = this.commands.get(interaction.commandName);
            if (command) return await command.execute(interaction);

            return await interaction.reply({
                content: "Oh no! Looks like something is not right here!",
                ephemeral: true
            });
        }
    }
}
