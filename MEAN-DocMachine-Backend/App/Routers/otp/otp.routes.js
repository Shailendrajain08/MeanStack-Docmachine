const express = require("express");
const router = express.Router();
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const userModel = require("../../models/users.model").UserModel;
module.exports = router;

router.post("/verify", async (req, res, next) => {
    
    const secretBase32 = req.user[0].otpDetails.tempSecret

    const token = speakeasy.totp({
        secret: secretBase32,
        encoding: 'base32',
      });

    let isVerified = speakeasy.totp.verify({
        secret: req.user[0].otpDetails.tempSecret,
        encoding: 'base32',
        token: token
    });

    if (isVerified) {
        userModel.updateOne(
            {_id: req.user[0]._id},{ $set: { "otpDone": 'yes' }}).then((user) => {
                if (user) {
                    return res.send({
                        "status": 200,
                        "message": "Two-factor Auth is enabled successfully"
                    });
                } else {
                    callback(null, null);
                }
            }).catch(()=>{
                if (err) {
                    callback(err, null);
                }
            })
        //commons.userObject.tfa.secret = commons.userObject.tfa.tempSecret;

    }
    else {
        return res.send({
            "status": 403,
            "message": "Invalid Auth Code, verification failed. Please verify the system Date and Time"
        });
    }
})