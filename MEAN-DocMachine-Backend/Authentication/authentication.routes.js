const express = require('express');
const router = express.Router();
const AuthCtrl = require("./authentication.controller");
module.exports = router;
// const aws = require("aws-sdk");


router.post("/signup", (req, res) => {
    console.log(res);
})