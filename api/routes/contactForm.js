const express = require('express')
const router = express.Router()

const ContactFormController = require('../controllers/contactForm.js')

router.post('/', ContactFormController.send_form)

module.exports = router
