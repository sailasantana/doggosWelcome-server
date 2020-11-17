
const app = require('./app')
const { PORT } = require('./misc/config')

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})