const express = require('express')
const router = express.Router()

const HomepageController = require('../controllers/contentful/homepage.js')
const LocationController = require('../controllers/contentful/location.js')
const PagesController = require('../controllers/contentful/pages.js')
const PageController = require('../controllers/contentful/page.js')
const NewsController = require('../controllers/contentful/news.js')
const NewsPostController = require('../controllers/contentful/newsPost.js')
const AuthorController = require('../controllers/contentful/author.js')
const ContactController = require('../controllers/contentful/contact.js')
const NavigationController = require('../controllers/contentful/navigation.js')

router.get('/homepage', HomepageController.homepage)
router.get('/location', LocationController.location)
router.get('/pages', PagesController.pages)
router.get('/page/:slug', PageController.page)
router.get('/news', NewsController.news)
router.get('/news/:postId', NewsPostController.newsPost)
router.get('/author/:userId', AuthorController.details)
router.get('/contact', ContactController.contact)
router.get('/navigation', NavigationController.navigation)

module.exports = router
