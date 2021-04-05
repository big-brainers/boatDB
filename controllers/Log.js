const express = require('express');
const Log = require('../db/models/Log');
const User = require('../db/models/User');
const router = express.Router();

//Get all logs
router.get('/', (req, res, next) => {
	Log.find({})
		.then((entry) => res.json(entry))
		.catch(next);
});

//GET a log by id
router.get('/:id', (req, res, next) => {
	Log.findById({ _id: req.params.id })
		.then((entry) => res.json(entry))
		.catch(next);
});

//POST create a log
router.post('/', (req, res) => {
	Log.create(req.body).then((entry) => res.json(entry));
});

//DELETE a log
router.delete('/:userId/:id', (req, res, next) => {
	Log.findByIdAndDelete(req.params.id)
		.then((delEntry) => res.json(delEntry))
		.catch(next);
});

module.exports = router;
