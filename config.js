require('dotenv').config()

const config = {
    express_session_secret: process.env.EXPRESS_SESSION_SECRET,
    port: process.env.PORT,
    admin_username: process.env.ADMIN_USERNAME,
    admin_password: process.env.ADMIN_PASSWORD,
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    node_env: process.env.NODE_ENV,
    devHostname: 'http://127.0.0.1:3000',
    prodHostname: ''
}

module.exports = config