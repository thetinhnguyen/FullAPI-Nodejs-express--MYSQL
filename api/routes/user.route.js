const express = require("express");
const router = express.Router();

const checkEmailMidle = require("../midlewares/check-email.midleware");
const userController=require('../controllers/user.controller')

router.post("/signup", checkEmailMidle, userController.sigup);

router.post("/login",userController.login);

module.exports = router;
