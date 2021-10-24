import {
    Client,
    MessageActionRow as DiscordMessageActionRow,
} from "discord.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DiscordComponents, MessageActionRow, MessageButton } from "discord.tsx";
import { injectable, inject, container } from "tsyringe";
import { symClient } from "../Constants";
import { randomBytes } from "node:crypto";

@injectable()
class YarnBotUtils {
    constructor(@inject(symClient) public client: Client) {}

    getRandomId(msg = "") {
        return `${msg || ""}_${randomBytes(4).toString("hex")}`;
    }

    getConfirmButtons(confirmDanger = false) {
        const confirmId = this.getRandomId("Confirm");
        const cancelId = this.getRandomId("Cancel");

        const buttons: { components: DiscordMessageActionRow[] } = (
            <>
                <MessageActionRow>
                    <MessageButton style="PRIMARY" label="Cancel" customId={cancelId} />
                    <MessageButton style={confirmDanger ? "DANGER" : "SUCCESS"} label="Confirm" customId={confirmId} />
                </MessageActionRow>
            </>
        );

        return {
            confirmId,
            cancelId,
            components: buttons.components
        };
    }
}

export default container.resolve<YarnBotUtils>(YarnBotUtils);