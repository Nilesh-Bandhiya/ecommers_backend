const jwt = require('jsonwebtoken')

const genrerateAccessToken = (_id) => {
    return jwt.sign({ _id }, process.env.ACCESS_JWT_SECRETE, { expiresIn: "1d" })
}

module.exports = { genrerateAccessToken }