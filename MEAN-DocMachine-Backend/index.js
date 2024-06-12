const express = require('express')
const app = express();
const db = require('mongoose')
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const passport = require("passport");
const { connectDB } = require("./db.js");
dotenv.config();

const Auth = require('./Authentication/authentication.routes.js');

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/authenticate", Auth);

app.listen(3000, () => console.log("Server started at port number: 3000"));

app.get('/', (req, res) => {
    res.send('server is ready')
});

process.on("uncaughtException", function (err) {
    console.error("Caught exception: " + err);
});