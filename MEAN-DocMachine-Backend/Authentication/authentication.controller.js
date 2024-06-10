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
                if (err) {
                    callback(err, null);
                }
                else if (res) {
                    console.log(res);
                    // ********** Post sign up activation **************
                    const activationMailObj = { user: { first_name: data.first_name, last_name: data.last_name }, host: data.origin, userToken: token, to: [{ 'email': data.emailId, 'name': data.first_name + ' ' + data.last_name, 'type': 'to' }], heading: 'Welcome !' };
                    // Function Name: mailObj

                    // ********** super admin email notify on new registration from same company **************
                    const mailObj = { newUser: { first_name: data.first_name, last_name: data.last_name, email: data.emailId }, host: data.origin, to: [{ 'email': 'admin@wrked.com', 'name': 'wrked', 'type': 'to' }, { 'email': 'eswervarma@uipep.com', 'name': 'wrked', 'type': 'cc' }], heading: 'New User Registration' };
                    // Function Name: toAdminNewUser
                    console.log(JSON.stringify(activationMailObj));
                    callback(null, token, res);
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