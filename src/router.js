const router = require("express").Router();
// const usersController = require("./controllers/users"); 
const usersAuthController = require("./controllers/users/auth");
const eventsController = require("./controllers/events");

const isLoggedIn = require("./middleware/isLoggedIn");


router.use("/users", usersAuthController);
// router.use("/users", usersController);

router.use("/events", isLoggedIn, eventsController);


module.exports = router;