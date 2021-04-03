const mongoose = require('mongoose')

const Tasks = require('../models/tasksModel')
const Users = require('../models/usersModel')

const TestData = require('./test_user.json')
const Data = require('./seeds.json')

Tasks.deleteMany({})
	.then(() => Tasks.insertMany(Data))
	.catch(console.error)
	.finally(() => process.exit)

Users.deleteMany({})
	.then(() => Users.insertMany(TestData))
	.catch(console.error)
	.finally(() => process.exit)