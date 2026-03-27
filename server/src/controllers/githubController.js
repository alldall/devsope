const {
  getUserFromGitHub,
  getReposFromGitHub,
  getRepoLanguagesFromGitHub
} = require('../services/githubService')

const getUser = async (req, res) => {
  try {
    const { username } = req.params
    const user = await getUserFromGitHub(username)
    res.json(user)
  } catch (error) {
    console.error(error.response?.data || error.message)
    res
      .status(error.response?.status || 500)
      .json({ message: 'Ошибка при получении пользователя' })
  }
}

const getRepos = async (req, res) => {
  try {
    const { username } = req.params
    const repos = await getReposFromGitHub(username)
    res.json(repos)
  } catch (error) {
    console.error(error.response?.data || error.message)
    res
      .status(error.response?.status || 500)
      .json({ message: 'Ошибка при получении репозиториев' })
  }
}

const getReposLanguages = async (req, res) => {
  try {
    const { username } = req.params
    const repos = await getReposFromGitHub(username)

    const languagesList = await Promise.all(
      repos.map(async repo => {
        const langs = await getRepoLanguagesFromGitHub(username, repo.name)
        return langs
      })
    )

    res.json(languagesList)
  } catch (error) {
    console.error(error.response?.data || error.message)
    res
      .status(error.response?.status || 500)
      .json({ message: 'Ошибка при получении языков' })
  }
}

module.exports = { getUser, getRepos, getReposLanguages }
