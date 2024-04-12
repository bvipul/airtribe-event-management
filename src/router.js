const router = require("express").Router();
// const usersController = require("./controllers/users"); 
const usersAuthController = require("./controllers/users/auth");


router.use("/users", usersAuthController);
// router.use("/users", usersController);


module.exports = router;