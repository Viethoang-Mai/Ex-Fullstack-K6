"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class EmailHistory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    EmailHistory.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: DataTypes.STRING,
            content: DataTypes.TEXT,
            to: DataTypes.STRING,
            status: DataTypes.STRING,
            sent_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "EmailHistory",
            tableName: "email_histories",
            timestamps: false,
        }
    );
    return EmailHistory;
};
