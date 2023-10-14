const path = require('path')
const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const store = new session.MemoryStore()

const { express_session_secret } = require('./config')

require('./controllers/db').openDB()
require('./controllers/db').addAdminAtStart()
require('./controllers/db').createCodesTable()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cors())
app.use(session({
    store,
    secret: express_session_secret,
    resave: false,
    saveUninitialized: false
}))
app.use('/css', express.static('./pages/styles'))
app.use('/js', express.static('./pages/scripts'))

const pages = require('./controllers/pages')

app.get('/', pages.getLoginPage)
app.get('/codes', pages.getCodesPage)
app.get('/error', pages.getErrorPage)

const apis = require('./controllers/apis')

app.post('/login', apis.getLoginResponse)
app.get('/items', apis.getItemsResponse)
app.get('/logout', apis.getLogoutResponse)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500)
    res.send({ error: error.message })
    next(error)
})

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, './pages/error.html'))
})

module.exports = app