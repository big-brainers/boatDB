const mongoose = require('../connection');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	entries: [],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
