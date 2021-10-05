import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define(
        "Guild",
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
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
            },
            welcomeChannel: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            farewellChannel: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            welcomeMessage: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "{user.mention}, welcome to **{guild.name}**."
            },
            farewellMessage: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "**{user.tag}** left the server!"
            },
            blacklisted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: true
        }
    );
};
