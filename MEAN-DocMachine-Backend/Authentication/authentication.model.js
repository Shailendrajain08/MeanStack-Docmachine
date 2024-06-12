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
            callback(err, null);
        });

};

const login = (query, callback) => {
    console.log('userModel Data');
    console.log(query);
    UserModel.find(query).then((result)=> {
        console.log(result)
        if (result.length > 0) {
            console.log("User Model Result", result);
            callback(null, result);
        } else {
            callback("User Model Result", "Invalid email");
        }
    }).catch((err) => {
            console.log("User Model Error", err);
            callback(err, null);
    })
};



module.exports = {
    addUser: addUser,
    login : login
}