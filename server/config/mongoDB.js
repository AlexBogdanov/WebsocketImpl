const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongooseConfig = config => {
    mongoose.connect(config.dbPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            throw err;
        }
    });
    db.on('error', reason => {
        console.log('Error connecting to MongoDB', reason);
    });
};

module.exports = config => mongooseConfig(config);