const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//controllers
const signIn = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password : 'postgres',
		database : 'smart-brain'
	}
});

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('it is working!!!');
});

// example of injection
app.post('/signin', signIn.handleSignIn(db, bcrypt));

// alternate way to achieve the same thing
app.post('/register', (req, res) => {register.handleRegister(db, bcrypt)(req, res)});

// no injection here
app.get('/profile/:id',(req, res) => {
	profile.handleProfileGet(req, res, db);
});

app.put('/image', image.handleImage(db));

app.post('/imageurl', image.handleApiCall);

app.listen(PORT, () => {
	console.log(`app is listening on port ${PORT}`);
});