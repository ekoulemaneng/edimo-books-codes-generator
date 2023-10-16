const randomString = require('random-string-builder')

module.exports = (short_title) => {
    const first = short_title === 'cf' ? 'CF' : 'AP'
    return first + randomString(8, true).toUpperCase()
}