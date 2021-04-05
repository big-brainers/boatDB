require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logController = require('./controllers/Log');
const userController = require('./controllers/User');
const app = express();
const port = ('port', process.env.PORT || 8000);
// const StartMongoServer = require('./db/connection');

app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Main route
app.get('/', (req, res) => res.send('BOAT!'));

app.get('/signup', (req, res) => {
	res.render('/signup');
});

app.get('/signin', (req, res) => {
	res.render('/signin');
});

// Logs Controller
app.use('/logs', logController);

// User Controller
app.use('/users', userController);

// StartMongoServer();

app.listen(port);
