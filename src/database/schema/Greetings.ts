import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define(
        "Greetings",
        {
            guild: {
                type: DataTypes.STRING,
                allowNull: false
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
            }
        },
        {
            timestamps: true
        }
    );
};
