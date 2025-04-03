'use strict';

/** @type {import('sequelize-cli').Migration} */
const tasks = require("../../data/tasks.json");

const taskJson = tasks.map(({ title, description, status }) => {
  return {
    title,
    description,
    status,
    createdAt: new Date(),
    updatedAt: new Date() // ✅ Agregar updatedAt
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', taskJson, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
