const randomString = require('random-string-builder')

module.exports = (type) => {
    const first = type === 'colored' ? 'C' : 'N'
    return first + randomString(13, true).toUpperCase()
}