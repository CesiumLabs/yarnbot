import {
    ButtonInteraction,
    Client,
    MessageActionRow as DiscordMessageActionRow,
    MessageEmbed,
    Snowflake,
    TextChannel
} from "discord.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DiscordComponents, MessageActionRow, MessageButton } from "discord.tsx";
import { injectable, inject, container } from "tsyringe";
import { ClientToken, COLORS } from "../Constants";
import { randomBytes } from "node:crypto";

@injectable()
class YarnBotUtils {
    constructor(@inject(ClientToken) public client: Client) {}

    getRandomId(msg = "") {
        return `${msg || ""}_${randomBytes(4).toString("hex")}`;
    }

    prompt(channel: TextChannel, message: string, author: Snowflake, confirmDanger = false) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            const embed = new MessageEmbed()
                .setTitle(message)
                .setColor(COLORS.WARNING)
                .setTimestamp()
                .setFooter("YarnBot | SnowflakeDev Community ❄️");

            const confirmId = this.getRandomId("ConfirmButton");
            const cancelId = this.getRandomId("CancelButton");

            const buttons: { components: DiscordMessageActionRow[] } = (
                <>
                    <MessageActionRow>
                        <MessageButton style="PRIMARY" label="Cancel" customId={cancelId} />
                        <MessageButton style={confirmDanger ? "DANGER" : "SUCCESS"} label="Confirm" customId={confirmId} />
                    </MessageActionRow>
                </>
            );

            const msg = await channel.send({ components: buttons.components, embeds: [embed] });
            msg.awaitMessageComponent({
                time: 30_000,
                filter: (interaction) => interaction.user.id === author,
                componentType: "BUTTON"
            })
            .then(async (cInteraction) => {
                const interaction = cInteraction as ButtonInteraction;
                const newButtons: { components: DiscordMessageActionRow[] } = (
                    <>
                        <MessageActionRow>
                            <MessageButton disabled style="PRIMARY" label="Cancel" customId={cancelId} />
                            <MessageButton disabled style={confirmDanger ? "DANGER" : "SUCCESS"} label="Confirm" customId={confirmId} />
                        </MessageActionRow>
                    </>
                );
                
                const success = interaction.customId === confirmId;
                await interaction.reply({
                    components: newButtons.components,
                    embeds: [
                        embed
                        .setColor(success ? COLORS.SUCCESS : COLORS.DANGER)
                        .setDescription(success ? "✅ Confirmed!" : "❌ | Cancelled!")
                    ]
                });

                resolve(success);
            })
            .catch(() => {
                resolve(false);
            });
        });
    }
}

export default container.resolve<YarnBotUtils>(YarnBotUtils);