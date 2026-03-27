const express = require('express')
const cors = require('cors')

const app = express()

const githubRoutes = require('./routes/githubRoutes')


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API работает 🚀')
})

app.use('/api/github', githubRoutes)

module.exports = app
