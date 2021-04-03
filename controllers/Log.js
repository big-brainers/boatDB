const express = require('express');
const Log = require('../db/models/Log');
const router = express.Router();

router.get('/', (req, res) => {
	Log.find({}).then((entry) => {
		res.json(entry);
	});
});

router.get('/:id', (req, res) => {
	Log.findById({ _id: req.params.id }).then((entry) => {
		res.json(entry);
	});
});

// router.get('/logs/:title', (req, res) => {
// 	Log.findOne({ title: req.params.title }).then((entry) => {
// 		res.json(entry);
// 	});
// });

router.post('/', (req, res) => {
	Log.create(req.body).then((entry) => {
		res.json(entry);
	});
});

router.put('/:id', (req, res) => {
	Log.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	}).then((entry) => {
		res.json(entry);
	});
});

router.delete('/:id', (req, res) => {
	Log.findByIdAndDelete({ _id: req.params.id }).then((delEntry) => {
		res.json(delEntry);
	});
});

module.exports = router;
