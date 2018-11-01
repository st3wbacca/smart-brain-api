const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//controllers
const signIn = require('./controllers/signIn');
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
	res.send(database.users); // we never made a new version of this
});

// just to show req & res are automatically sent thru
app.post('/signin', signIn.handleSignIn(db, bcrypt));

// alternate way to achieve the same thing
app.post('/register', (req, res) => {register.handleRegister(db, bcrypt)(req, res)});

// not changing this one so i have an example of the old way
app.get('/profile/:id',(req, res) => {
	profile.handleProfileGet(req, res, db);
});

app.put('/image', image.handleImage(db));

app.post('/imageurl', image.handleApiCall);

app.listen(PORT, () => {
	console.log('app is running on port ' + PORT);
});