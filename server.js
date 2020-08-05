
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
var bodyParser = require('body-parser')

var session = require('express-session')

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}
app.use(session(sess));

app.use(express.static('client/build'));

const routesApp = require('./google-analytics-node/routes')
routesApp(app)

//for production
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies

    app.use(express.static('client/build'));
    app.get('/', function (req, res, next) {
        res.sendFile(__dirname, 'client/build/index.html');
    })
    app.get('*', function (req, res, next) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}

//for dev
if (process.env.NODE_ENV != 'production') {

    app.use(express.static(path.join(__dirname, 'client/public')));

    app.get('/', function (req, res) {
        res.sendFile(__dirname, 'client/public', 'index.html');
    })
    require('dotenv').config();
}

const port = process.env.PORT || 5000;
app.listen(port, error => { if (error) { throw error; } else { console.log('The server is running on port: ' + port); } })