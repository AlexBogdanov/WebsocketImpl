const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

const objFactory = require('./../utils/objFactory');
const { EMAIL_PATTERN } = require('./../constants/regex');
const { secret } = require('./../config/config');

const userFields = [
    'username',
    'email',
    'password',
    'repeatPassword'
];

module.exports = ({
    userData
}) => {
    return {
        create: (req, res) => {
            const areFieldsValid = objFactory.checkIfAllFieldsArePresent(req.body, userFields);
    
            if (!areFieldsValid) {
                res.error('Missing fields', null, 500);
            }
    
            const userDto = objFactory.createObj(req.body, userFields);
    
            if (userDto.username.length < 3) {
                res.error('Username too short', null, 500);
            }
    
            if (userDto.password.length < 6) {
                res.error('Password too short', null, 500);
            }
    
            if (userDto.password !== userDto.repeatPassword) {
                res.error('Passwords must match', null, 500);
            }
    
            const regex = new RegExp(EMAIL_PATTERN);
            if (!regex.test(userDto.email)) {
                res.error('Invalid email', null, 500);
            }

            const hash = passwordHash.generate(userDto.password);
            const user = {
                username: userDto.username,
                email: userDto.email,
                password: hash
            };

            userData.create(user)
                .then(() => {
                    res.success();
                })
                .catch(err => {
                    res.error(err.message, null, 500);
                });
        },
        getById: (req, res) => {
            userData.getById(req.params.id)
                .then(res.success)
                .catch(err => {
                    res.error(err.message, null, 500);
                });
        },
        update: async (req, res) => {
            const isAnyValidFieldPresent = objFactory.checkIfAnyFieldIsPresent(req.body, userFields);

            if (!isAnyValidFieldPresent) {
                res.error('Invalid fields', null, 500);
            }

            try {
                const userDB = await userData.getById(req.body.id);
                const presentFields = objFactory.getPresentFields(req.body, userFields);
                const newUser = objFactory.cloneAndUpdateAnObj(userDB, req.body, userFields, presentFields);
                const fetchedUser = await userData.update(req.body.id, newUser);

                res.success(fetchedUser);
            } catch (err) {
                res.error(err.message, null, 500);
            }
        },
        delete: (req, res) => {
            userData.delete(req.params.id)
                .then(res.success)
                .catch(err => {
                    res.error(err.message, null, 500);
                });
        },
        login: async (req, res) => {
            const { email, password } = req.body;

            try {
                const fetchedUser = await userData.getByEmail(email);
                const doPasswordsMatch = passwordHash.verify(password, fetchedUser.password);

                if (!doPasswordsMatch) {
                    res.error("Invalid password");
                }

                const token = await jwt.sign({ userId: fetchedUser.id }, secret);
                res.success(token);
            } catch (err) {
                res.error(err.message, null, 500);
            }
        }
    }
};