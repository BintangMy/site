const bcrypt = require('bcryptjs');

function hashPassword(data) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data, salt)
    return hash
}

module.exports = {hashPassword}