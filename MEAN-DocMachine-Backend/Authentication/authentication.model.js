// const UserModelHelper = require("../projects/model_helpers/user_model.helper");
const bcrypt = require('bcryptjs');
const validators = require("../Healpers/validators.js");
const UserModel = require("../models/users.model").UserModel;
// const ProfileDetailsModel = require('../projects/models/ProfileDetails').ProfileDetailsModel;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const EmailTemplate = require("../Model-Helper/email_template.js");


const addUser = (user, callback) => {
    console.log("ADD USER MODEL ");
    console.log("m user", user);
    let emailId = user.emailId;
    UserModel.create(user)
        .then((result) => {
            if (!result) {
                console.log("Something went wrong");
                callback(err, null);
            }else if(result){
            let resp = JSON.parse(JSON.stringify(result));
            if (delete resp.password) {
                EmailTemplate.sendVerifyEmail({ emailId }, (err, res) => {
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

            }
            })
        .catch((err) => {
            console.error(err);
        });

};



module.exports = {
    addUser: addUser
}