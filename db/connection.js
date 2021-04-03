require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.URI;

const mongoURI = `${URI}/boat-backend`;

const startMongoServer = async () => {
	try {
		await mongoose
			.connect(mongoURI, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useFindAndModify: true,
			})
			.then((instance) => {
				console.log(`connected to ${instance.connections[0].name}`);
			});
	} catch (event) {
		console.log(event);
		throw event;
	}
};

module.exports = startMongoServer;
