// const UserModelHelper = require("../projects/model_helpers/user_model.helper");
const bcrypt = require('bcryptjs');
const validators = require("../Healpers/validators.js");
const UserModel = require("../models/users.model").UserModel;
// const ProfileDetailsModel = require('../projects/models/ProfileDetails').ProfileDetailsModel;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const EmailTemplate = require("../projects/model_helpers/email_template");


const addUser = (user, callback) => {
    console.log("ADD USER MODEL ");
    console.log(user);
    let emailId = user.emailId;
    UserModel.create(data)
                .then((result) => {
                    // res.send({
                    //     kq: 1,
                    //     msg: 'Đã thêm thành công'
                    // });
                    // console.log(result)
                    let resp = JSON.parse(JSON.stringify(result));
                    if (delete resp.password) {
                       mailTransporter.sendMail({ emailId }, (err, res) => {
                            if (err) {
                                callback(err, null);
                            } else if (res) {
                                callback(null, res);
                            } else {
                                callback(null, null);
                            }
                        });
                        // console.log("User Model Result:", resp);
                    } else {
                        EmailTemplate.sendVerifyEmail({ emailId }, (err, res) => {
                            if (err) {
                                callback(err, null);
                            } else if (res) {
                                callback(null, res);
                            } else {
                                callback(null, null);
                            }
                        });
                    }
                })
                .catch((err) => {
                    res.send({
                        kq: 0,
                        msg: 'kết nối DB thất bại'
                    });
                    console.error(err);
                });
    // UserModel.create(user, (err, res) => {
 
    //     if (err) {
    //         console.log("User Model Error: ", err);
    //         callback(err, null);
    //     } else if (res) {

    //         let resp = JSON.parse(JSON.stringify(res));
            
    //     } else {
    //         callback(null, null);
    //     }
    // });
};

const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "shailendrajain.javaventures@gmail.com",
        pass: "mslo bvbh fxli auce",
    },
});

let mailDetails = {
    from: "shailendrajain.javaventures@gmail.com",
    to: email,
    subject: "Reset Password!",
    html: `
    <html>
        <head>
            <title>Password Reset Request</title>
        </head>
        <body>
            <h1>Password Reset Requies</h1>
            <p>Dear ${user.firstName} ${user.lastName},</p>
            <p>We have receive a request to reset your Password for your account with BookMyBook. To complete the password reset process, please click on the button below:</p>
            <a href=${process.env.LIVE_URL}/reset-password/${token}><button style="background-color: #4CAF50; color:white; padding:14px 20px; border:none; cursor:pointer; border-radius:4px; ">Reset Password</button></a>
            <p>Please not that this link is only valid for a 5 minutes, If you did not request a password reset, Please disregard this message.</p>
            <p>Thank You</p>
            <p>BookMyBook Team</p>
        </body>
    </html>
    `,
};

module.exports = {
    addUser : addUser
}