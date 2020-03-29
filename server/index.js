const express = require('express');
const Cors = require('cors');
const bodyParse = require('body-parser');
const jsender = require('jsender');
const passport = require('passport');

const config = require('./config/config');
require('./config/mongoDB')(config);

const app = express();
app.use(jsender());

app.use(Cors());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

require('./config/passport');
app.use(passport.initialize());

const data = require('./data')();
const controllers = require('./controllers')(data);
require('./routers')(app, controllers);

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));

module.exports = app;