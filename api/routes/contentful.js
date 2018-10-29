const express = require("express");
const router = express.Router();

const ContentfulController = require('../controllers/contentful.js');

router.get("/homepage", ContentfulController.homepage);
router.get("/pages", ContentfulController.pages);
router.get("/page/:slug", ContentfulController.page);
router.get("/contact", ContentfulController.contact);
router.get("/navigation", ContentfulController.navigation);
router.get("/meta", ContentfulController.meta);

module.exports = router;
