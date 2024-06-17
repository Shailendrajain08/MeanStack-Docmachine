const express = require('express');
const router = express.Router();
module.exports = router;
const UserModel = require('../../models/users.model').UserModel;
const AuthCtrl = require("./authentication.controller");
const resp = require("../../Healpers/respHelper.js");
const EmailTemplate = require("../../Model-Helper/email_template.js");
const EmailFormat = require("../../email-store/email-formats.js");
const fs = require('fs');
const nodemailer = require('nodemailer');
// const aws = require("aws-sdk");


router.post("/signup", (req, res) => {
    if (req.body.user) {
        UserModel.findOne({
            emailId: req.body.user.emailId
        }).then((user) => {
            if (!user) {
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
    } else {
        resp.missingBody(res, "Missing Body");
    }
})

router.post("/login", (req, res) => {
    if (req.headers && req.headers.authorization) {
        headers = req.get("authorization");
        headers = headers.split(" ");
        AuthCtrl.userLogin(headers[1], (err, docs) => {
            if (err) {
                if (err.name && err.name === "wrong mode of login")
                    resp.alreadyRegisteredWithGoogle(
                        res,
                        "Email logged in through google please login through Google!"
                    );
                else resp.errorResponse(res);
            } else if (docs) {
                resp.successPostResponse(res, docs, "Authenticated");
            } else {
                resp.noRecordsFound(res, "Invalid Email-ID/Password");
            }
        });
    } else {
        resp.missingBody(res, "Missing Email-ID/Password");
    }
});


router.put("/updateemail", (req, res) => {
    if (req.body.emailId) {
        UserModel.updateOne({
            emailId: req.body.emailId,
        }, { $set: { "emailIdVerified": true } },
        ).then((user) => {
            if (user) {
                const html = EmailFormat.generalFormat({ html: `User Logged in with ${req.body.emailId} to DocMachine please check `, heading: "New User Registered", host: process.env.LIVE_URL });

                // Configure the email transport using nodemailer
                let transporter = nodemailer.createTransport({
                    service: 'gmail', // Use your email service
                    auth: {
                        user: process.env.EMAIL_USER, // Your email
                        pass: process.env.EMAIL_PASSWORD // Your email password
                    }
                });

                const mailOptions = {
                    to: ['shailendra.jain0894@gmail.com'], // Change to your recipient
                    from: "shailendrajain.javaventures@gmail.com", // Change to your verified sender
                    subject: "New User Registered",
                    text: "New User Registered",
                    html: html
                };

                // Send mail with defined transport object
                let info = transporter.sendMail(mailOptions);
                res.status(200)
                    .json({
                        message: "Verified Successfully",
                        data: user
                    })
            } else {
                res.status(400)
                    .json({
                        message: "Not verified",
                        data: resp
                    })
            }

        }).catch((err) => {
            console.log("error while adding product:", err);
            res.status(400)
                .json({
                    message: "Not verified",
                    data: resp
                })
        })
    }
    else {
        resp.missingBody(res, "Missing Body");
    }
})

router.put("/forgotpsw", (req, res) => {
    UserModel.findOne({
        emailId: req.body.emailId
    }).then((user) => {
        if (user) {
            console.log(user)
        }
    }).catch((err)=> {
        resp.errorResponse(
            res,
            err,
            501,
            "Internal Server Error, Please Try Again Later"
        );
    })
})
