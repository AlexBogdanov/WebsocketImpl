module.exports = models => {
    const userData = require('./user-data')(models);

    return {
        userData
    }
};