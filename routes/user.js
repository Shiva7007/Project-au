const express = require("express");
const router = express.Router();

const user = require("../controllers/user");


router.post("/user/", user.userPost);

router.post("/user/login-user", user.loginCheck);

router.get("/user/logout", user.logout);

router.get("/user/", user.userGet);

router.get("/user/:username", user.userGetone);

router.put("/user/:username", user.userUpdate);

router.delete("/user/:username", user.userDelete);



router.get("/login", user.login);

router.get("/signup", user.signup);

router.get("/home", user.home);



module.exports = router;
