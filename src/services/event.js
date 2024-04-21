const { Event } = require("../models");

module.exports = {
  async create ({
    name,
    city,
    address,
    maxPeople,
    createdBy
  }) {
    return Event.create({
      name,
      city,
      address,
      maxPeople,
      createdBy
    });
  },

  async getById (id) {
    return Event.scope('default').findOne({
      where: {
        id
      },
    });
  },

  async getAll() {
    return Event.scope('default').findAll();
  },

  async update(id, body) {
    return Event.update(body, {
      where: {
        id
      }
    });
  },

  async delete(id) {
    return Event.destroy({
      where: {
        id
      }
    });
  }
};