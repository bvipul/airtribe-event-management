'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('event_attendees', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "events"
          }
        },
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users"
          }
        },
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('event_attendees');
  }
};
