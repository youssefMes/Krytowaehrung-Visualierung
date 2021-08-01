const express = require('express')
const cors = require('cors')
const routes = require('./routes/main.route')
const app = express()
const port = 9000

app.use(cors())
app.use('/api', routes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
