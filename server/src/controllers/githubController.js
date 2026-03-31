const {
  getUserFromGitHub,
  getReposFromGitHub,
  getRepoLanguagesFromGitHub,
  getUserEventsFromGitHub
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

const getActivity = async (req, res) => {
  try {
    const { username } = req.params
    const events = await getUserEventsFromGitHub(username)
    const pushEvents = events.filter(e => e.type === 'PushEvent')

    const activityMap = {}
    pushEvents.forEach(e => {
      const date = e.created_at.split('T')[0]
      activityMap[date] = (activityMap[date] || 0) + e.payload.commits.length
    })

    const activityArray = Object.keys(activityMap)
      .sort()
      .map(date => ({ date, count: activityMap[date] }))

    res.json(activityArray)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Ошибка при получении активности' })
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

module.exports = { getUser, getRepos, getReposLanguages, getActivity }
