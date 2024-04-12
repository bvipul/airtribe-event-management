const jwt = require("jsonwebtoken");
const UserService = require("./../../services/user");
const {
  registerUserValidator,
  loginUserValidator
} = require("../../validators/user");
const validateRequestSchema = require("../../middleware/validateRequestSchema");
const { ValidationError } = require("../../utils/custom-errors");

const usersAuthController = () => {
  const router = require("express").Router();

  router.post("/register", registerUserValidator, validateRequestSchema, async (req, res) => {
    const {
      name,
      email,
      password
    } = req.body;

    const user = await UserService.create({
      name,
      email,
      password
    });

    return res.status(201).json({
      message: "User created successfully",
      user: user.apiResponse()
    });
  });

  router.post("/login", loginUserValidator, validateRequestSchema, async (req, res) => {
    const {
      email,
      password
    } = req.body;

    const userExists = await UserService.getUserByEmail(email);

    if (!userExists) {
      throw new ValidationError({
        message: "email or password is not correct",
        code: "EMAIL_PASSWORD_WRONG"
      });
    }

    const passwordIsValid = await UserService.validatePassword(password, userExists.password);

    if (!passwordIsValid) {
      throw new ValidationError({
        message: "email or password is not correct",
        code: "EMAIL_PASSWORD_WRONG"
      })
    }

    return res.status(200).json({
      token: jwt.sign({
        id: userExists.id,
      }, process.env.JWT_SECRET_KEY)
    });
  });

  return router;
};

module.exports = usersAuthController();