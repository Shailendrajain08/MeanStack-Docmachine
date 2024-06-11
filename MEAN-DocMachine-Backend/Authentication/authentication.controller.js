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
    data.fullName = data.fullName.charAt(0).toUpperCase() + data.fullName.slice(1);
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
            data["user_name"] =
            data.emailId.substring(0, data.emailId.indexOf("@")) +
            "_" +
            data.emailId.substring(data.emailId.indexOf("@") + 1, data.emailId.indexOf(".")) +
            "_" +
            data.emailId.substring(data.emailId.indexOf(".") + 1, data.emailId.length);
            console.log(data)
            AuthModel.addUser(data, (err, res) => {
                if (err) {
                    callback(err, null);
                }
                else if (res) {
                    console.log("res from add user",data);
                    // ********** Post sign up activation **************
                    const activationMailObj = { user: { full_name: data.fullName}, host: data.origin, userToken: data.token, to: [{ 'email': data.emailId, 'name': data.fullName, 'type': 'to' }], heading: 'Welcome !' };
                    // Function Name: mailObj

                    // ********** super admin email notify on new registration from same company **************
                    const mailObj = { newUser: { full_name: data.fullName, email: data.emailId }, host: data.origin, to: [{ 'email': 'jain.shailendra0894@gmail.com', 'name': 'shailendra', 'type': 'to' }], heading: 'New User Registration' };
                    // Function Name: toAdminNewUser
                    console.log(JSON.stringify(activationMailObj));
                    callback(null, data.token, res);
                } else {
                    callback(null, null);
                }
            });
        } else {
            callback(null, null)
        }
    });
}

module.exports = {
    capitaliseFirstLetter: capitaliseFirstLetter,
    signUpUser: signUpUser
}