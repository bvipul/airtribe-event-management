const { User } = require("../models");
const bcrypt = require("bcrypt");
const { ConflictError } = require("../utils/custom-errors");

module.exports = {
  async create({
    name,
    email,
    password
  }) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashPassword
      });

      return user;
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        throw new ConflictError({
          message: "Email already exists!",
          code: "USER_EMAIL_ALREADY_EXISTS"
        });
      }
      
      throw new Error("Something went wrong!", e);
    }
  },

  async validatePassword (password, userPassword) {
    return bcrypt.compare(password, userPassword);
  },

  async getByEmail (email) {
    const user = await User.findOne({
      where: {
        email
      }
    });

    return user;
  }
};