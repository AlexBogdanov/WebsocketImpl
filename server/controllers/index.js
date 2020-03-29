module.exports = data => {
    const userController = require('./user-controller')(data);

    return {
        userController
    }
};