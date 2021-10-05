import { ClientEvents } from "discord.js/typings/index.js";

export default class BaseEvent {
    constructor(public readonly config: { name: keyof ClientEvents }) {}

    get name() {
        return this.config.name;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    execute(...args: any[]): Promise<any> | any {
        return;
    }
}
