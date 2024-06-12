const bcrypt = require('bcryptjs');
const validators = require("../Healpers/validators");
// const EmailTemplate = require("../projects/model_helpers/email_template");
// const EmailTemplates = require('../mails/mailhelper/email-store/email-templates');
// const Email = require('../../helpers/mail');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const UserModel = require("../models/users.model").UserModel;
const AuthModel = require("./authentication.model")


function capitaliseFirstLetter(data) {
    data.fullName = data.fullName.charAt(0).toUpperCase() + data.fullName.slice(1);
    return data;
}

function signUpUser(data, callback) {
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
            AuthModel.addUser(data, (err, res) => {
                if (err) {
                    callback(err, null);
                }
                else if (res) {
                    // ********** Post sign up activation **************
                    const activationMailObj = { user: { full_name: data.fullName }, host: data.origin, userToken: data.token, to: [{ 'email': data.emailId, 'name': data.fullName, 'type': 'to' }], heading: 'Welcome !' };
                    // Function Name: mailObj

                    // ********** super admin email notify on new registration from same company **************
                    const mailObj = { newUser: { full_name: data.fullName, email: data.emailId }, host: data.origin, to: [{ 'email': 'jain.shailendra0894@gmail.com', 'name': 'shailendra', 'type': 'to' }], heading: 'New User Registration' };
                    // Function Name: toAdminNewUser
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

function userLogin(authString, callback) {
    console.log(authString);
    validators.decodeAuthString(authString, (email, password) => {
        console.log("email", email);
        console.log('password', password);
        if (email && password) {
            AuthModel.login({ emailId: email }, (err, res) => {
                console.log("AuthCtrl", res[0]._id);
                if (err) {
                    callback(err, null);
                } else if (res[0].password) {

                    bcrypt.compare(password, res[0].password, (err, same) => {

                        if (err) {
                            callback(err, null);
                        } else if (same) {
                            console.log('11161717171717');
                            console.log(res);
                            if (res[0].otpDone == 'no') {
                                const secret = speakeasy.generateSecret({
                                    length: 10,
                                    name: res[0].fullName,
                                    issuer: 'DocMachine'
                                });
                                var url = speakeasy.otpauthURL({
                                    secret: secret.base32,
                                    label: res[0].fullName,
                                    issuer: 'DocMachine',
                                    encoding: 'base32'
                                });
                                QRCode.toDataURL(url, (err, dataURL) => {
                                    let data = {
                                        secret: '',
                                        tempSecret: secret.base32,
                                        dataURL,
                                        tfaURL: url
                                    };
                                    UserModel.updateOne({
                                        _id: res[0]._id
                                    }, { $set: { "otpDetails": data } }).then((result) => {
                                        if (result) {
                                            validators.generateJWTToken(res[0]._id, (err, token) => {
                                                callback(null, {
                                                    token: token,
                                                    role: res[0].role,
                                                    message: 'TFA Auth needs to be verified',
                                                    tempSecret: secret.base32,
                                                    dataURL,
                                                    tfaURL: secret.otpauth_url
                                                });
                                            });
                                            console.log("Bene getting successfully:",result);
                                            //callback(null, user);
                                        } else {
                                            callback(null, null);
                                        }

                                    }).catch((err) => {
                                        console.log("error while adding product:", err);
                                            callback(err, null);
                                    })

                                });
                            } else if (res[0].otpDone == 'yes') {
                                validators.generateJWTToken(res[0]._id, (err, token) => {
                                    callback(null, {
                                        token: token,
                                        role: res[0].role
                                    });
                                });
                            } else {
                                const secret = speakeasy.generateSecret({
                                    length: 10,
                                    name: res[0].fullName,
                                    issuer: 'DocMachine'
                                });
                                var url = speakeasy.otpauthURL({
                                    secret: secret.base32,
                                    label: res[0].fullName,
                                    issuer: 'DocMachine',
                                    encoding: 'base32'
                                });
                                QRCode.toDataURL(url, (err, dataURL) => {
                                    let data = {
                                        secret: '',
                                        tempSecret: secret.base32,
                                        dataURL,
                                        tfaURL: url
                                    };
                                    UserModel.updateOne({
                                        _id: res[0]._id
                                    }, { $set: { "otpDetails": data } }).then((result) => {
                                        console.log("00000000",result);
                                        if (result) {
                                            validators.generateJWTToken(res[0]._id, (err, token) => {
                                                callback(null, {
                                                    token: token,
                                                    role: res[0].role,
                                                    message: 'TFA Auth needs to be verified',
                                                    tempSecret: secret.base32,
                                                    dataURL,
                                                    tfaURL: secret.otpauth_url
                                                });
                                            });
                                            console.log("Bene getting successfully:", result);
                                            //callback(null, user);
                                        } else {
                                            callback(null, null);
                                        }
                                    }).catch((err) => {
                                        console.log("error while adding product:", err);
                                        callback(err, null);
                                    })

                                });
                            }

                        } else {
                            callback(null, null);
                        }
                    });
                }
                else {
                    return callback({ name: 'wrong mode of login' }, null);
                    // callback(null, null);
                }
            });
        } else {
            callback(null, null);
        }
    });
}

module.exports = {
    capitaliseFirstLetter: capitaliseFirstLetter,
    signUpUser: signUpUser,
    userLogin: userLogin
}