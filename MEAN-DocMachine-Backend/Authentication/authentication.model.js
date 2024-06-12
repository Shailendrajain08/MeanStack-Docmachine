// const UserModelHelper = require("../projects/model_helpers/user_model.helper");
const bcrypt = require('bcryptjs');
const validators = require("../Healpers/validators.js");
const UserModel = require("../models/users.model").UserModel;
// const ProfileDetailsModel = require('../projects/models/ProfileDetails').ProfileDetailsModel;
const EmailTemplate = require("../Model-Helper/email_template.js");


const addUser = (user, callback) => {
    UserModel.create(user)
        .then((result) => {
            if (!result) {
                console.log("Something went wrong");
                callback(err, null);
            }else if(result){
            let resp = JSON.parse(JSON.stringify(result));
            if (delete resp.password) {
                EmailTemplate.sendVerifyEmail( user , (err, res) => {
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
                    EmailTemplate.sendVerifyEmail( user , (err, res) => {
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