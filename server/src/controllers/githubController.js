const { getUserFromGitHub } = require('../services/githubService')

const getUser = async (req, res) => {
  try {
    const { username } = req.params
    const user = await getUserFromGitHub(username)

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    res.json(user)
  } catch (error) {
    console.error('GitHub API Error:', error.response?.data || error.message)
    res
      .status(error.response?.status || 500)
      .json({ message: 'Ошибка при получении пользователя' })
  }
}

module.exports = {
  getUser
}
