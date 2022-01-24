const jwt = require('jsonwebtoken');

const createJWTToken = user => {
    return jwt.sign({user}, 'testetst',{
        expiresIn: '1h',
    });
};

module.exports = {
    createJWTToken
}