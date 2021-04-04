const express = require('express');
const Log = require('../db/models/Log');
const User = require('../db/models/User');
const router = express.Router();

//Get all logs
router.get('/logs', (req, res, next) => {
	Log.find({})
		.then((entry) => res.json(entry))
		.catch(next)
})

//GET all user logs
router.get('/Users/:userId/logs', (req, res, next) => {
	User.findById({ _id: req.params.userId })
		.then((user) => res.json(user.entry))
		.catch(next)
})

//GET a log by id
router.get('/logs/:id', (req, res, next) => {
	Task.findById({ _id: req.params.id })
		.then((entry) => res.json(entry))
		.catch(next)
})

//POST create a log
router.post('/users/:userId/logs/create', (req, res, next) => {
	Log.create(req.body)
		.then((newEntrie) => {
			User.findOneAndUpdate(
				req.params.userId,
				{ $push: {logs: newEntrie} },
				{ new: true }
			)
			.then(add => res.json(add))
		})
		.catch(next)
})

//PUT updates a log
router.put('/Users/:userId/logs/:id', (req, res, next) => {
	Task.findByIdAndUpdate(
			{ _id: req.params.id }, 
			req.body, 
			{ new: true }
		)
		.then((entry) => res.json(entry))
		.catch(next)
})

//DELETE a log
router.delete('/logs/:id', (req, res, next) => {
	Log.findByIdAndDelete(req.params.id)
		.then((delEntry) => res.json(delEntry))
		.catch(next)
})

module.exports = router;