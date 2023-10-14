const http = require('http')

const app = require('./app')
const server = http.createServer(app)

const port = require('./config').port

server.listen(port, () => {
    console.log(`Listening server on port: ${port}`)
})