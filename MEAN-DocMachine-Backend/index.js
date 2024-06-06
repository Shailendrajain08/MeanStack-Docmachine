const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config({ path: ".env" });
const multer = require("multer");
const passport = require("passport");
const { connectDB } = require("./db.js");
const session = require('express-session');

const Auth = require('./Authentication/authentication.routes.js');


app.use("/api/authenticate", Auth);

// app.use(cors({ origin: "*" }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         // "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }


// app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(cors({
    // origin: 'http://localhost:4200',
    // credentials: true
}
))

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

app.disable("x-powered-by");

app.use(multerMid.single("file"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// require("./app/config/passport")(passport);

app.listen(3000, () => console.log("Server started at port number: 3000"));

app.get('/', (req, res) => {
    res.send('server is ready')
});

process.on("uncaughtException", function(err) {
    console.log("Caught exception: " + err);
});