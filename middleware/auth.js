const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

module.exports = async function (req, res, next) {
	const token = req.header('token');
	if (!token)
		return res.status(401).json({
			message: 'Auth Error',
		});

	try {
		const decoded = jwt.verify(token, 'randomString');
		req.user = decoded.user;

		const user = await User.findById(decoded.user.id);
		if (req.route.path === '/add_task') {
			if (user.userRole !== 'admin') {
				res.status(500).send({
					message: 'Insufficient privileges',
				});
			}
		}
		next();
	} catch (event) {
		console.error(event);
		res.status(500).send({
			message: 'Invalid Token',
		});
	}
};