import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define(
        "Moderation",
        {
            guild: {
                type: DataTypes.STRING,
                allowNull: false
            },
            maxWarnKickLevel: {
                type: DataTypes.NUMBER,
                defaultValue: 3
            },
            maxWarnBanLevel: {
                type: DataTypes.NUMBER,
                defaultValue: 4
            },
            actionLogChannel: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            modLogChannel: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            }
        },
        {
            timestamps: true
        }
    );
};
