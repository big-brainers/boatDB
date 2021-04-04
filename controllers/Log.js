const express = require('express');
const Log = require('../db/models/Log');
const User = require('../db/models/User');
const router = express.Router();

//Get all logs
router.get('/', (req, res, next) => {
	Log.find({})
		.then((entry) => res.json(entry))
		.catch(next)
})

//GET a log by id
router.get('/:id', (req, res, next) => {
	Log.findById({ _id: req.params.id })
		.then((entry) => res.json(entry))
		.catch(next)
})

//POST create a log
router.post('/:userId/create', (req, res, next) => {
	Log.create(req.body)
		.then((newLog) => {
			User.findOneAndUpdate(
				req.params.userId,
				{ $push: {entries: newLog} },
				{ new: true }
			)
			.then(add => res.json(add))
		})
		.catch(next)
})

//PUT updates a log
// router.put('/:userId/:id', (req, res, next) => {
// 	Log.findByIdAndUpdate(
// 			{ _id: req.params.id }, 
// 			req.body, 
// 			{ new: false }
// 		)
// 		.then((entry) => res.json(entry))
// 		.catch(next)
// })
// router.patch('/:id', (req, res, next) => {
// 	const id = req.params.id;
// 	const entrieData = req.body;
// 	User.findOne({
// 	  'entries._id': id,
// 	})
// 	  .then((user) => {
// 		const entry = user.entries.id(id);
// 		entry.set(entrieData);
// 		return user.save();
// 	  })
// 	  .then(() => res.sendStatus(204))
// 	  .catch(next);
//   })

//DELETE a log
router.delete('/:userId/:id', (req, res, next) => {
	Log.findByIdAndDelete(req.params.id)
		.then((delEntry) => res.json(delEntry))
		.catch(next)
})

module.exports = router;