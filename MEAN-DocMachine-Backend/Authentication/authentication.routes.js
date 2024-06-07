const express = require('express');
const router = express.Router();
module.exports = router;
const UserModel = require('../models/users.model').UserModel;
const AuthCtrl = require("./authentication.controller");
// const aws = require("aws-sdk");


router.post("/signup", (req, res) => {
    if (req.body) {
        UserModel.findOne({
            emailId: req.body.emailId
        }).then((user)=> {
            if(!user) {
                if (req.body.confirmPassword !== req.body.password) {
                    return res.status(501).send(`Both password should be same`);
                }
                let user_data = AuthCtrl.capitaliseFirstLetter(req.body);
                AuthCtrl.signUpUser(user_data, (err1, docs) => {})
            }
        })
    }
})