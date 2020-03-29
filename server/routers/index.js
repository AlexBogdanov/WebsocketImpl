module.exports = (app, controllers) => {
    const userRouter = require('./user-router')(controllers);

    app
        .use('/user', userRouter);
};