const { getUserFromGitHub } = require('../services/githubService')

const getUser = async (req, res) => {
  try {
    const { username } = req.params

    const user = await getUserFromGitHub(username)

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пользователя' })
  }
}

module.exports = {
  getUser
}
