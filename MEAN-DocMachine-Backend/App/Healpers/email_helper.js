// const mandrill = require('node-mandrill');

// const sendMail = function (dataObj, next) {
//     var input = { to: dataObj.to, cc: {}, from: {}, subject: dataObj.subject, html: dataObj.html };
//     input.from = [dataObj.fromEmail, dataObj.fromName];
//     var parameters = { "apiKey": "tadXOQW82YZRDLTC", "timeout": 5000 };
//     var sendinObj = new sendinblue(parameters);
//     sendinObj.send_email(input, function (err, response) {
//         if (err) {
//             next(err, null)
//         } else {
//             next(null, { type: 'success', data: response })
//         }
//     });
    
//     console.log("test");
// };


// const sendMandrillMail = function(dataObj, next) {
//     mandrill('/messages/send', {
//         message: dataObj
//     }, (error, response) => {
//         if (error) {
//             console.log("err in Mandrill");
//             next(JSON.stringify(error), null);
//         } else {
//             console.log("response");
//             console.log(response);
//             next(null, {type: 'success', data: response});
//         }
//     });
// };

// module.exports = {sendMail: sendMail, sendMandrillMail: sendMandrillMail};