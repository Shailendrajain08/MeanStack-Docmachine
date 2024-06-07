const bcrypt = require('bcryptjs');
const validators = require("../Healpers/validators");
// const EmailTemplate = require("../projects/model_helpers/email_template");
// const EmailTemplates = require('../mails/mailhelper/email-store/email-templates');
// const Email = require('../../helpers/mail');
// const speakeasy = require('speakeasy');
// const QRCode = require('qrcode');
const UserModel = require("../models/users.model").UserModel;
const AuthModel = require("./authentication.model")


function capitaliseFirstLetter(data) {
    console.log(data);
    data['fullName'] = data.fullName.charAt(0).toUpperCase() + data.fullName.slice(1);
    console.log(data);
    return data;
}

function signUpUser(data, callback) {
    console.log(data);
    console.log(callback);
    validators.hashPassword(data.password, (err, hash) => {
        if (err) {
            callback(err, null);
        } else if (hash) {
            data.password = hash;
            data.otpDone = 'no';
            data.termsAndCondition = true;
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            data.date = `${day}/${month}/${year}`;
            AuthModel.addUser(data, (err, res) => {
                console.log("USER model");
                console.log(res);
            })
            
        } else {
            callback(null, null);
        }
    });
}

module.exports = {
    capitaliseFirstLetter: capitaliseFirstLetter,
    signUpUser: signUpUser
}