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

const Auth = require('./App/Routers/Authentication/authentication.routes.js');
const otp = require('./App/Routers/otp/otp.routes.js');
const team = require('./App/Routers/team/team.routes.js');

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
require("./App/config/passport.js")(passport);

app.use("/api/authenticate", Auth);
app.use(
    "/api/otp",
    passport.authenticate("jwt", { session: false }),
    otp
);
app.use(
    "/api/team",
    passport.authenticate("jwt", { session: false }),
    team
);

app.listen(process.env.PORT, () => console.log(`Server started at port number: ${process.env.PORT}`));

app.get('/', (req, res) => {
    res.send('server is ready')
});

process.on("uncaughtException", function (err) {
    console.error("Caught exception: " + err);
});