const path = require('path')
const { loginValidator } = require('../services/inputsValidators')
const { checkLoginCredentials, getCodesGenerated } = require('./db')

exports.getLoginResponse = async (req, res) => {
    try {
        const { username, password } = req.body
        if (loginValidator(username, password).length > 0) return res.status(400).json({ data: validationResult[0] })
        if (!(await checkLoginCredentials(username, password))) return res.status(400).json({ data: 'Les informations d\'authentication sont erronés.' })
        req.session.authenticated = true
        res.json({ redirect: `/codes`})
    } 
    catch (error) {
        console.error(error)
    }
}

exports.getItemsResponse = async (req, res) => {
    try {
        if (!req.session.authenticated) return res.status(401).json({ redirect: '/' })
        const { n, type } = req.query
        res.json({ data: await getCodesGenerated(n, type), type })
    } 
    catch (error) {
        console.error(error)
    }
}

exports.getLogoutResponse = async (req, res) => {
    try {
        if (!req.session.authenticated) return res.status(401).json({ redirect: '/' })
        req.session.authenticated = false
        res.json({ redirect: '/'})
    } 
    catch (error) {
        console.error(error)
    }
}