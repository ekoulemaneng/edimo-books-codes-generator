const bcrypt = require('bcrypt')
const { saltRounds } = require('../config')

exports.hashPassword = async (plainTextPassword) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(plainTextPassword, salt)
    } 
    catch (error) {
        console.error(error)
    }
    return null
}

exports.checkPassword = async (plainTextPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainTextPassword, hashedPassword)
    } 
    catch (error) {
        console.error(error)
    }
    return false
}