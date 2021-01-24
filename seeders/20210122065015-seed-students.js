'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const students = JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
    students.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    })
    return queryInterface.bulkInsert('Students', students, {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Students', null, {});
  }
};
