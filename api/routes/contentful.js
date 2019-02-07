const express = require("express");
const router = express.Router();

const ContentfulController = require('../controllers/contentful.js');

router.get("/homepage", ContentfulController.homepage);
router.get("/location", ContentfulController.location);
router.get("/pages", ContentfulController.pages);
router.get("/page/:slug", ContentfulController.page);
router.get("/news", ContentfulController.news);
router.get("/contact", ContentfulController.contact);
router.get("/navigation", ContentfulController.navigation);

module.exports = router;
