const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/LoginLimiter')

// npm i express-rate-limit 
//npm i jsonwebtoken
router.route('/') 
    .post(loginLimiter,authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
     .post(authController.logout)
router.route('/register')
     .post(authController.register)


module.exports = router