const { Schema, SchemaTypes, model } = require('mongoose');

const UserSchema = new Schema({
    username: { type: SchemaTypes.String, required: true, unique: true },
    password: { type: SchemaTypes.String, required: true },
    email: { type: SchemaTypes.String, required: true, unique: true }
});

const User = model('User', UserSchema);
module.exports = User;