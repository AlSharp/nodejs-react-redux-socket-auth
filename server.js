const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/test';

const authMiddleware = require('./authMiddleware');

const secret = 'mysecretstring';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {useMongoClient: true}, error => {
  if (error) {
    throw error;
  } else {
    console.log('Successfully connected to test database');
  }
})

const PORT = 5000;

server.listen(PORT);

io.on('connect', socket => {
  console.log(`Socket with id ${socket.id} connected`);
})

// enable cors
app.use(cors({credentials: true, origin: 'http://imac-dev:3000'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse cookie
app.use(cookieParser());

app.use('/', express.static(__dirname + '/client/build'));

app.get('/', authMiddleware(secret), (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

app.get('/api/checkToken', authMiddleware(secret), (req, res) => {
  res.sendStatus(200);
})

require('./db/routes/user')(app);
require('./db/routes/authenticate')(app, secret);