// const MailHelper = require('../../../helpers/email_helpers');
const validators = require("../Healpers/validators")
const EmailFormat = require("../email-store/email-formats");
require('dotenv').config({ path: '.env' });
const fs = require('fs');
const nodemailer = require('nodemailer');

// let config = {
//     localConfig: {
//         frontend: {
//             url: process.env.LOCAL
//         }
//     },
//     betaConfig: {
//         frontend: {
//             url: process.env.BETA
//         }
//     },
//     devConfig: {
//         frontend: {
//             url: process.env.DEV
//         }
//     },
//     prodConfig: {
//         frontend: {
//             url: process.env.PROD
//         }
//     }
// };

// const sendVerificationEmailTemplate = (dataObj, next) => {
//     if (dataObj.id && dataObj.driverId && dataObj.payment && dataObj.riderId) {
//         // const newUser = dataObj.newUser;
//         const verificationUrl = 'http://localhost:8901/v1/user/verifyEmail?';
//         let content = `<p>hello ${dataObj.driverId.first_name}: </p><br/>`;
//         content = content + `<p>Welcome to Mission Possibe Click to <a href= '` + verificationUrl + `'>verify email</a></p><br/>`;
//         // const mailData = {
//         //     from_email: dataObj.from_email ? dataObj.from_email : 'emailId goes here', from_name: 'Name given in mandrill',
//         //     to: [{ 'email': 'user emailId', 'name': 'User name', 'type': 'to' },],
//         //     subject: 'Verification_Email',
//         //     html: content,
//         // };
//         MailHelper.sendMandrillMail(mailData, (err, data) => {
//             if (err) {
//                 next(err, null);
//             } else {
//                 next(null, { success: true, data });
//                 // console.log(data);
//             }
//         });
//     }
// };

// const sendForgotEmail = (dataObj, next) => {
//     if (dataObj) {
//         // {{api-base}}/authenticate/updatePassword?emailId=benjamin@gmail.com
//         validators.generateJWTToken(dataObj.emailId, (err, res) => {
//             console.dir("After token verification");
//             console.dir(res);
//             if (err) {
//                 console.log("err");
//                 next(err, null);
//             } else if (res) {
//                 let appConfig = {};
//                 console.log('environment variables passed', process.env.deployment);
//                 switch (process.env.deployment) {
//                     case 'local':
//                         appConfig = config.localConfig;
//                         break;
//                     case 'beta':
//                         appConfig = config.betaConfig;
//                         break;
//                     case 'dev':
//                         appConfig = config.devConfig;
//                         break;
//                     case 'prod':
//                         appConfig = config.prodConfig;
//                         break;
//                     default:
//                         console.log('loading local environment 111');
//                         appConfig = config.localConfig
//                 }
//                 console.dir("res");
//                 console.dir(res);
//                 const forgotemailLink = appConfig.frontend.url + '/updatePassword/' + res.split(" ")[1];
//                 console.log(forgotemailLink);
//                 let content = `<p>Hello!</p><br/>`;
//                 content = content + `<p>Welcome to Docmachine Click <a href= '` + forgotemailLink + `'>to change your password</a></p><br/>`;
//                 const html = EmailFormat.generalFormat({ html: content, heading: "Forgot Password", host: appConfig.frontend.url });
//                 const msg = {
//                     to: dataObj.emailId, // Change to your recipient
//                     from: 'admin@docmachine.in', // Change to your verified sender
//                     subject: 'Forgot password for docmachine',
//                     text: content,
//                     html: html,
//                 };

//                 sgMail
//                     .send(msg)
//                     .then(() => {
//                         console.log("Message Sent");
//                         next(null, { success: true });

//                     }).catch((error) => {
//                         console.error(error);
//                         next(error, null);

//                     })
//                     // MailHelper.sendMandrillMail(mailData, (err, data) => {
//                     //     if (err) {
//                     //         console.dir("err");
//                     //         console.dir(data);


//                 //         next(err, null);


//                 //     } else {
//                 //         console.dir("data");
//                 //         console.dir(data);

//                 //          next(null, { success: true, data });
//                 //         console.log(data);
//                 //     }
//                 // });
//             } else {
//                 console.dir("null");

//                 next(null, null);
//             }
//         });

//     }
// };



const sendVerifyEmail = (dataObj, next) => {
    if (dataObj) {
        validators.generateJWTToken(dataObj.emailId, (err, res) => {
            if (err) {
                next(err, null);
            } else if (res) {
                try {
                    dataObj.token = res
                    // Construct the verification link
                    const forgotemailLink = `${process.env.LIVE_URL}/verifyEmail/${res.split(" ")[1]}`;
                    // Create the email content
                    let content = `<p>Hello!</p><br/>`;
                    content += `<p>Welcome to Docmachine. Click <a href='${forgotemailLink}'>to verify your account.</a></p><br/>`;
                    const html = EmailFormat.generalFormat({ html: content, heading: "Account Verification", host: process.env.LIVE_URL });

                    // Configure the email transport using nodemailer
                    let transporter = nodemailer.createTransport({
                        service: 'gmail', // Use your email service
                        auth: {
                            user: process.env.EMAIL_USER, // Your email
                            pass: process.env.EMAIL_PASSWORD // Your email password
                        }
                    });

                    // Setup email data
                    let mailOptions = {
                        from: 'shailendrajain.javaventures@gmail.com', // Sender address
                        to: dataObj.emailId, // List of recipients
                        // bcc: ['docmachinetec@gmail.com', 'tramsdocmachine@gmail.com', 'fintech.innovations2021@gmail.com'], // BCC recipients
                        subject: 'Verify Your email', // Subject line
                        text: 'Welcome to docMachine', // Plain text body
                        html: html // HTML body content
                    };

                    // Send mail with defined transport object
                    let info = transporter.sendMail(mailOptions);
                    next(null, { dataObj});
                } catch (error) {
                    console.error(error);
                    next(error, null);
                }
            } else {
                console.dir("null");

                next(null, null);
            }
        });

    }
};

// const sendMemberEmail = (dataObj, data, next) => {

//     if (dataObj) {
//         // {{api-base}}/authenticate/updatePassword?emailId=benjamin@gmail.com
//         validators.generateJWTTokenMember(dataObj.email, dataObj.name, data.companyId, data.companyName, (err, res) => {
//             console.dir("After token verification");
//             console.dir(res);
//             console.dir(dataObj.email);
//             if (err) {
//                 console.log("err");
//                 next(err, null);
//             } else if (res) {
//                 let appConfig = {};
//                 console.log('environment variables passed', process.env.deployment);
//                 switch (process.env.deployment) {
//                     case 'local':
//                         appConfig = config.localConfig;
//                         break;
//                     case 'beta':
//                         appConfig = config.betaConfig;
//                         break;
//                     case 'dev':
//                         appConfig = config.devConfig;
//                         break;
//                     case 'prod':
//                         appConfig = config.prodConfig;
//                         break;
//                     default:
//                         console.log('loading local environment 111');
//                         appConfig = config.localConfig
//                 }
//                 console.dir("res");
//                 console.dir(res);
//                 const forgotemailLink = appConfig.frontend.url + '/membersignin/' + res.split(" ")[1];
//                 console.log(forgotemailLink);
//                 let content = `<p>Hello! ${dataObj.name}</p><br/>`;
//                 content = content + `<p>Welcome to Docmachine your added to <b>${data.companyName}</b> Click <a href= '` + forgotemailLink + `'>here to create your account.</a> Use this email as your userID</p><br/>`;
//                 const html = EmailFormat.generalFormat({ html: content, heading: "Invitation to Join DocMachine", host: appConfig.frontend.url });
//                 const msg = {
//                     to: dataObj.email, // Change to your recipient
//                     from: "admin@docmachine.in", // Change to your verified sender
//                     subject: "Inviting to DocMachine",
//                     text: "Welcome to docMachine",
//                     html: html
//                 };

//                 sgMail
//                     .send(msg)
//                     .then(() => {
//                         console.log("Message Sent");
//                         next(null, { success: true });

//                     }).catch((error) => {
//                         console.error(error);
//                         next(error, null);

//                     })
//                     // MailHelper.sendMandrillMail(mailData, (err, data) => {
//                     //     if (err) {
//                     //         console.dir("err");
//                     //         console.dir(data);


//                 //         next(err, null);


//                 //     } else {
//                 //         console.dir("data");
//                 //         console.dir(data);

//                 //          next(null, { success: true, data });
//                 //         console.log(data);
//                 //     }
//                 // });
//             } else {
//                 console.dir("null");

//                 next(null, null);
//             }
//         });

//     }
// };

// const sendDocuments = (dataObj, next) => {

//     // function base64_encode(file) {
//     //     let bitmap = fs.readFileSync(file);
//     //     return new Buffer(bitmap).toString('base64');
//     // }

//     // let data_base64 = base64_encode(dataObj.byteArray);

//     if (dataObj) {
//         // {{api-base}}/authenticate/updatePassword?emailId=benjamin@gmail.com
//         validators.generateJWTTokenPdf(dataObj.emailId, (err, res) => {
//             console.dir("After token verification");
//             console.dir(res);
//             if (err) {
//                 console.log("err");
//                 next(err, null);
//             } else if (res) {
//                 let appConfig = {};
//                 console.log('environment variables passed', process.env.deployment);
//                 switch (process.env.deployment) {
//                     case 'local':
//                         appConfig = config.localConfig;
//                         break;
//                     case 'beta':
//                         appConfig = config.betaConfig;
//                         break;
//                     case 'dev':
//                         appConfig = config.devConfig;
//                         break;
//                     case 'prod':
//                         appConfig = config.prodConfig;
//                         break;
//                     default:
//                         console.log('loading local environment 111');
//                         appConfig = config.localConfig
//                 }
//                 console.dir("res");
//                 console.dir(res);
//                 const forgotemailLink = appConfig.frontend.url + '/updatePassword/' + res.split(" ")[1];
//                 console.log(forgotemailLink);
//                 let content = `<p>Hello!</p><br/>`;
//                 content = content + `<p>Here is the documents You generated </p>`;
//                 const html = EmailFormat.generalFormat({ html: content, heading: "Documents", host: appConfig.frontend.url });
//                 const msg = {
//                     to: dataObj.emailId, // Change to your recipient
//                     from: 'admin@docmachine.in', // Change to your verified sender
//                     subject: 'Documents',
//                     text: content,
//                     html: html,
//                     attachments: [{ // encoded string as an attachment
//                         filename: 'BankAttachment.pdf',
//                         content: dataObj.byteArray,
//                         encoding: 'base64'
//                     }]
//                 };

//                 sgMail
//                     .send(msg)
//                     .then(() => {
//                         console.log("Message Sent");
//                         next(null, { success: true });

//                     }).catch((error) => {
//                         console.error(error);
//                         next(error, null)

//                     })
//                     // MailHelper.sendMandrillMail(mailData, (err, data) => {
//                     //     if (err) {
//                     //         console.dir("err");
//                     //         console.dir(data);


//                 //         next(err, null);


//                 //     } else {
//                 //         console.dir("data");
//                 //         console.dir(data);

//                 //          next(null, { success: true, data });
//                 //         console.log(data);
//                 //     }
//                 // });
//             } else {
//                 console.dir("null");

//                 next(null, null);
//             }
//         });

//     }
// };

module.exports = {
    sendVerifyEmail: sendVerifyEmail,
    // sendVerificationEmailTemplate: sendVerificationEmailTemplate,
    // sendForgotEmail: sendForgotEmail,
    // sendMemberEmail: sendMemberEmail,
    // sendDocuments: sendDocuments
};
