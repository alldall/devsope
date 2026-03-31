const express = require('express')
const router = express.Router()
const {
  getUser,
  getRepos,
  getReposLanguages,
  getActivity
} = require('../controllers/githubController')

router.get('/user/:username', getUser)
router.get('/repos/:username', getRepos)
router.get('/repos-languages/:username', getReposLanguages)
router.get('/activity/:username', getActivity)

module.exports = router
