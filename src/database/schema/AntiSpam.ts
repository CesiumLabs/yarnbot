import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define(
        "AntiSpam",
        {
            guild: {
                type: DataTypes.STRING,
                allowNull: false
            },
            spamBlock: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            spamBlockMute: {
                type: DataTypes.NUMBER,
                defaultValue: 5
            },
            spamBlockBan: {
                type: DataTypes.NUMBER,
                defaultValue: 6
            }
        },
        {
            timestamps: true
        }
    );
};
