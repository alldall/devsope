const express = require('express')
const router = express.Router()
const {
  getUser,
  getRepos,
  getReposLanguages
} = require('../controllers/githubController')

router.get('/user/:username', getUser)
router.get('/repos/:username', getRepos)
router.get('/repos-languages/:username', getReposLanguages)

module.exports = router
