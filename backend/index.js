const connectToMongo = require('./db')
const express = require('express')
connectToMongo()
const app = express()
const port = 3000
// use middle ware  for req body  agr hame req.body ko  use kran hai to ye middle ware lagana padega
app.use(express.json())

// available routes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})