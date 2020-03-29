const router = require('express').Router();
const passport = require('passport');

module.exports = ({
    userController
}) => {
    router
        .post('/create', passport.authenticate('jwt'), userController.create)
        .post('/register', userController.create)
        .post('/login', userController.login)
        .get('/get/:id', userController.getById)
        .patch('/update', passport.authenticate('jwt'), userController.update)
        .delete('/delete/:id', passport.authenticate('jwt'), userController.delete);

    return router;
};