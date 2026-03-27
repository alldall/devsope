const axios = require('axios')

const getUserFromGitHub = async username => {
  const response = await axios.get(`https://api.github.com/users/${username}`, {
    headers: { 'User-Agent': 'DevScope-App' }
  })
  return response.data
}

const getReposFromGitHub = async username => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`,
    { headers: { 'User-Agent': 'DevScope-App' } }
  )
  return response.data
}

const getRepoLanguagesFromGitHub = async (owner, repo) => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    { headers: { 'User-Agent': 'DevScope-App' } }
  )
  return response.data
}

module.exports = {
  getUserFromGitHub,
  getReposFromGitHub,
  getRepoLanguagesFromGitHub
}
