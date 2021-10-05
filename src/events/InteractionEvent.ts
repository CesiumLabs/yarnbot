import { Collection, Constants, Interaction } from "discord.js";
import { inject, injectable } from "tsyringe";
import { COLORS, CommandsToken } from "../Constants";
import logger from "../logger";
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

            try {
                if (command) return await command.execute(interaction);
            } catch (err) {
                const error = err as Error;
                logger.error(`[${interaction.commandName}] Command execution error:\n${error.stack || error}`);
                if (!interaction.replied && !interaction.deferred)
                    return await interaction.reply({
                        content: "Oh no! Something went wrong while executing this command:",
                        embeds: [
                            {
                                title: "Command Error",
                                color: COLORS.DANGER,
                                description: error.stack || error.message || `${error}`,
                                timestamp: Date.now(),
                                footer: {
                                    text: `Command: ${interaction.commandName}`
                                }
                            }
                        ],
                        ephemeral: true
                    });
            }

            if (!interaction.replied && !interaction.deferred)
                return await interaction.reply({
                    content: "Oh no! Looks like something is not right here!",
                    ephemeral: true
                });
        }
    }
}
