import { Sequelize } from "sequelize";
import GuildModel from "./schema/Guild";
import logger from "../logger";

export default class Database {
    public sequelize = new Sequelize(process.env.DATABASE, {
        logging: false
    });

    public guildModel = GuildModel(this.sequelize);

    connect() {
        this.sequelize
            .authenticate()
            .then(() => logger.info("Connected to the database!"))
            .catch((e) => logger.error(`${e}`));
    }
}
