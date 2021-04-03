const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all users

router.get('/', (req, res, next) => {
	User.find({})
		.then((users) => res.json(users))
		.catch(next);
});

//GET user id

router.get('/:id', (req, res, next) => {
	User.findById({
		_id: req.params.id,
	})
		.then((user) => res.json(user))
		.catch(next);
});

//PUT a user
router.put('/:id', (req, res, next) => {
	User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
		.then((user) => res.json(user))
		.catch(next);
});

//DELETE user

router.delete('/:id', (req, res, next) => {
	User.findByIdAndDelete(req.params.id)
		.then((user) => res.json(user))
		.catch(next);
});

//Signup new user

router.post(
	'/signup',
	[
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a valid password').isLength({
			min: 6,
		}),
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({
				email,
			});
			if (user) {
				return res.status(400).json({
					msg: 'User Already Exists',
				});
			}
			user = new User({
				email,
				password,
			});
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				'randomString',
				{
					expiresIn: 10000,
				},
				(err, token) => {
					if (err) throw err;
					res.status(200).json({
						token,
					});
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Error in Saving');
		}
	}
);

//Login user

router.post(
	'/login',
	[
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a valid password').isLength({
			min: 6,
		}),
	],

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({
				email,
			});
			if (!user)
				return res.status(400).json({
					message: 'User Does not Exist',
				});
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({
					message: 'Incorrect Password!',
				});
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				'randomString',
				{
					expiresIn: 3600,
				},
				(err, token) => {
					if (err) throw err;
					res.status(200).json({
						token,
					});
				}
			);
		} catch (e) {
			console.error(e);
			res.status(500).json({
				message: 'Server Error',
			});
		}
	}
);

//Get a user by

router.get('/me', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.json({
			response: 'success',
		});
	} catch (e) {
		res.send({
			message: 'Error in Fetching user',
		});
	}
});

module.exports = router;
