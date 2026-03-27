const express = require('express')
const router = express.Router()

const { getUser } = require('../controllers/githubController')

router.get('/user/:username', getUser)

module.exports = router
