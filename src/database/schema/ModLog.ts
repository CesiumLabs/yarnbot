import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define(
        "ModLog",
        {
            case: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            actionType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            moderator: {
                type: DataTypes.STRING,
                allowNull: false
            },
            reason: {
                type: DataTypes.STRING,
                defaultValue: "No reason specified!"
            },
            guild: {
                type: DataTypes.STRING,
                allowNull: false
            },
            messageId: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: true
        }
    );
};
