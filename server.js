const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
  		ssl: true,
	}
});

const PORT = process.env.PORT || 3001;

// MIDDLEWARE
const app = express();
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.get('/', (req, res) => {res.send('root get route')});
app.post('/signin', signin.handleSignIn(db, bcrypt)); //example of injection
app.post('/register', (req, res) => {register.handleRegister(db, bcrypt)(req, res)}); //alternate injection
app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req, res, db)}); //example without injection
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall);

app.listen(PORT, () => {console.log(`app is listening on port ${PORT}`)});