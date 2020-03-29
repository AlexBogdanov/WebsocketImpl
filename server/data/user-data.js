module.exports = () => {
    const User = require('./../models/User');
    const userCrud = require('./crud')(User);

    return {
        create: data => new Promise((res, rej) => {
            userCrud.create(data)
                .then(res)
                .catch(rej);
        }),
        getById: id => new Promise((res, rej) => {
            userCrud.getById(id)
                .then(res)
                .catch(rej);
        }),
        update: (id, newUser) => new Promise((res, rej) => {
            userCrud.updateById(id, newUser)
                .then(res)
                .catch(rej);
        }),
        delete: id => new Promise((res, rej) => {
            userCrud.deleteById(id)
                .then(res)
                .catch(rej);
        }),
        getByEmail: email => new Promise((res, rej) => {
            User.findOne({ email }, (err, user) => {
                if (err) rej(err);
                res(user);
            });
        })
    }
}