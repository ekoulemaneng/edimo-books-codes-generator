const { admin_username, admin_password } = require('../config')
const { hashPassword, checkPassword } = require('../services/passwordProcessors')
const codeBuilder = require('../services/codeBuilder')
const sqlite3 = require('sqlite3').verbose()
const { open } = require('sqlite')
 
const db = open({ filename: './database/db.sqlite', driver: sqlite3.Database }) 

exports.openDB = async () => {
    try {
        console.log('Connected to database.')
        return await db 
    } 
    catch (error) {
        console.error(error)
    }
}

exports.addAdminAtStart = async () => {
    try {
        await (await db).run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, role TEXT UNIQUE);')
        const hashedPassword = await hashPassword(admin_password)
        await (await db).run(`INSERT OR IGNORE INTO users (username, password, role) VALUES ("${admin_username}", "${hashedPassword}", "admin");`) 
    } 
    catch (error) {
        console.error(error)
    }
}

exports.createCodesTable = async () => {
    try {
        await (await db).run('CREATE TABLE IF NOT EXISTS codes (id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT UNIQUE NOT NULL, book_title TEXT NOT NULL);')
    } 
    catch (error) {
        console.error(error)
    }
}

exports.checkLoginCredentials = async (username, password) => {
    try {
        const user = await (await db).get('SELECT * FROM users WHERE username = ?', username)
        if (!user) return false
        if (!(await checkPassword(password, user.password))) return false
        return true
    } 
    catch (error) {
        console.error(error)
    }
}

exports.getCodesGenerated = async (n, short_title) => {
    try {
        let sql = 'INSERT INTO codes (code, book_title) VALUES '
        const strings = []
        while (strings.length < n) {
            let str = codeBuilder(short_title)
            let code = await (await db).get('SELECT * FROM codes WHERE code = ?;', [str])
            while (code) {
                str = codeBuilder(short_title)
                code = await (await db).get('SELECT * FROM codes WHERE code = ?;', [str])
            }
            strings.push(str)
        }
        const book_title = short_title === 'cf' ? 'Connaissances fondamentales' : 'Aspects pratiques'
        for (let i = 0; i < strings.length; i++) {
            if (i < strings.length - 1) sql += `("${strings[i]}", "${book_title}"), `
            else sql += `("${strings[i]}", "${book_title}");`
        }
        await (await db).run(sql)
        return strings
    } 
    catch (error) {
        console.error(error)
    }
}


 

