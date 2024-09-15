"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("email_histories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            content: {
                type: Sequelize.TEXT,
            },
            to: {
                type: Sequelize.STRING,
            },

            status: {
                type: Sequelize.STRING,
            },

            sent_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("email_histories");
    },
};
