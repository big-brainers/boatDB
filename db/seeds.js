// const StartMongoServer = require('./connection');

const Logs = require('../db/models/Log');
const Users = require('../db/models/User');

const TestData = require('./test_user.json');
const Data = require('./seeds.json');

// StartMongoServer();

Logs.deleteMany({})
	.then(() => Logs.insertMany(Data))
	.then(() => Users.deleteMany({}).then(() => Users.insertMany(TestData)))
	.catch(console.error)
	.finally(() => process.exit);

// Users.deleteMany({})
// 	.then(() => Users.insertMany(TestData))
// 	.catch(console.error)
// 	.finally(() => process.exit);
