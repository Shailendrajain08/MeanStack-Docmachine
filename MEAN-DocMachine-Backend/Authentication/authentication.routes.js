const express = require('express');
const router = express.Router();
module.exports = router;
const UserModel = require('../models/users.model').UserModel;
const AuthCtrl = require("./authentication.controller");
const resp = require("../Healpers/respHelper")
// const aws = require("aws-sdk");


router.post("/signup", (req, res) => {
    console.log("user body",req.body.user)
    if (req.body.user) {
        UserModel.findOne({
            emailId: req.body.user.emailId
        }).then((user)=> {
            if(!user) { 
                if (req.body.confirmPassword !== req.body.password) {
                    return res.status(501).send(`Both password should be same`);
                }
                let user_data = AuthCtrl.capitaliseFirstLetter(req.body.user);
                AuthCtrl.signUpUser(user_data, (err, docs) => {
                    if (err) {
                        if (err.name && err.name === "ValidationError") {
                            resp.errorResponse(res, "Required Fields Are Missing");
                        } else if (err.code && err.code === 11000) {
                            resp.alreadyRegistered(res, "Email Id Already Registered");
                        } else {
                            resp.errorResponse(res, "Internal Server Error");
                        }
                    } else if (docs) {
                        resp.successPostResponse(res, docs, "Successfully Signed Up New User");
                    } else {
                        resp.noRecordsFound(res, "Can't Add New User");
                    }
                })
            }
            else {
                return res.status(501).send(`Email ID already exist`);
            } 
        })
    }else {
        resp.missingBody(res, "Missing Body");
    }
})

router.post("/login", (req, res) => {
    console.log("my res",res)
});
