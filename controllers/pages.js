const path = require('path')

exports.getLoginPage = async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../pages/login.html'))
}

exports.getCodesPage = async (req, res) => {
    if (!req.session.authenticated) return res.redirect('/')
    res.sendFile(path.resolve(__dirname, '../pages/codes.html'))
}

exports.getErrorPage = async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../pages/error.html'))
}