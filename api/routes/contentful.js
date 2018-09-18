const express = require("express");
const router = express.Router();

const ContentfulController = require('../controllers/contentful.js');

router.get("/homepage", ContentfulController.homepage);

// router.post("/login", UserController.user_login);

// router.post("/token", UserController.token);

// router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;
