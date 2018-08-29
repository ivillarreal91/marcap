const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const db = require('./connectionDB/connection');

const app = express();

db.getConnection();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use('/cat_insidencias', route);

const port = 1234;

app.listen(port, () => {
	console.log('Server is up and running on port numner ' + port);
});