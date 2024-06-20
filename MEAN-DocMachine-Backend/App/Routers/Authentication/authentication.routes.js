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
const misc = require('../../Healpers/misc.js')


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
    if (req.body.emailId) {
        UserModel.findOne({
            emailId: req.body.emailId
        }).then((user) => {
            if (user) {
                AuthCtrl.forgotpsw(req.body.emailId, function (err, docs) {
                    if (err) {
                        resp.errorResponse(
                            res,
                            err,
                            501,
                            "Internal Server Error, Please Try Again Later"
                        );
                    } else if (docs) {
                        resp.successPostResponse(
                            res,
                            null,
                            `Password Reset Link Has Been Sent To Your Email Id ${req.body.emailId
                            }`
                        );
                    } else {
                        resp.noRecordsFound(res, "Invalid Email Id");
                    }
                });
            } else {
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "User Not found with this emailId"
                );
            }
        }).catch((err) => {
            resp.errorResponse(
                res,
                err,
                501,
                "Internal Server Error, Please Try Again Later"
            );
        })
    } else {
        resp.missingBody(res, "Missing Body");
    }
})

router.put("/updatepsw", (req, res) => {
    if (req.body.emailId && req.body.newPassword) {
        AuthCtrl.resetpsw(req.body.emailId, req.body.newPassword, function (err, docs) {
            if (err) {
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "Internal Server Error, Please Try Again Later"
                );
            } else if (docs) {
                resp.successPostResponse(
                    res,
                    null,
                    `Password Has Been Updated Successfully`
                );
            } else {
                resp.noRecordsFound(res, "Invalid Email Id");
            }
        })
    } else {
        resp.missingBody(res, "Missing Body");
    }
});

router.get("/getAllUser", (req, res) => {
    UserModel.find().then((doc) => {
        res.status(200)
            .json({
                message: "All User getting successfully",
                data: doc
            })
    }).catch((err) => {
        console.log('Error in retreving :' + JSON.stringify(err, undefined, 2))
    })
})

router.put("/updateOneUser", (req, res) => {
    console.log(req.body)
    UserModel.updateOne({
        _id: req.body._id
    }, { $set: { "verified": req.body.data } }).then((user) => {
        if (req.body.data == 'yes') {
            console.log("yes");

            var content = 'Your account is verified by DocMachine, please use this emailId as your username'
        } else if (req.body.data == 'no') {
            console.log("no");
            var content = 'Your account is taken back by DocMachine'
        } else if (req.body.data == 'declined') {
            console.log("no");
            res.status(200)
                .json({
                    message: "Account Declined successfully",
                    data: user
                });
            return
        }
        const html = EmailFormat.generalFormat({ html: content, heading: "User Approval" });
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASSWORD // Your email password
            }
        });

        const mailOptions = {
            to: req.body.emailId, // Change to your recipient
            from: "shailendra.jain0894@gmail.com", // Change to your verified sender
            subject: "Account verified by DocMachine",
            text: "New User Registered",
            html: html
        };

        // Send mail with defined transport object
        let info = transporter.sendMail(mailOptions);
        res.status(200)
            .json({
                message: "Updated successfully",
                data: user
            })
    }).catch((err) => {
        res.status(400)
            .json({
                message: "Not verified",
                data: resp
            })
    })
})

router.post("/deleteUser", function (req, res) {
    if (req.body) {
        UserModel.deleteOne({ _id: req.body.id })
            .then((result) => {
                res.status(200)
                    .json({
                        message: "User Deleted Successfully",
                        data: result
                    })
            }).catch((err) => {
                res.status(404)
                    .json({
                        message: "Something went wrong",
                        data: err
                    })
            })
    } else {
        resp.missingBody(res, "Missing Body");
    }
})

router.get("/profile", (req, res) => {
        console.log(req)
    // misc.checkUser(, res).then((user) => {
    //     AuthCtrl.getProfile(user).then(
    //     (data) => resp.successGetResponse(res, data),
    //     (err) => resp.errorResponse(res, err)
    //   );
    // });
});