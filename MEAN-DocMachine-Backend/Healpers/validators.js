const bcrypt = require('bcryptjs');
const rounds = 10;
const atob = require('atob');
const SECRET = process.env.SECRET;
let b64ToString;
let creds = [];
const jwt = require('jsonwebtoken');

function validateMobileNo(number) {
    if (number && (number.toString()).length > 6 && (number.toString()).length < 11) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function hashPassword(password, callback) {
    bcrypt.hash(password, rounds, function(err, hash) {
        if (err) {
            console.error('Error while hashing the password', rounds, password, err, hash);
            callback(err, null);
        } else if (hash) {
            console.log("Compare Password");
            //    console.log(bcrypt.compareSync(password,currentPassword));
            console.
            info('Hash Successfully Created');
            callback(null, hash);
        } else {
            callback(null, null);
        }
    })
}

function decodeAuthString(authString, callback) {
    b64ToString = atob(authString);
    creds = b64ToString.split(':');
    if (creds && creds.length === 2) {
        callback(creds[0], creds[1]);
    } else {
        callback(null, null);
    }
}

function generateJWTToken(id, callback) {
    const payload = {
        _id: id
    };
    console.log('The Hex Id String:', payload);
    let token = jwt.sign(payload, SECRET, {
        expiresIn: 604800 * 20 //20 weeks
    });
    token = 'JWT ' + token;

    console.info('Successfully created an access token', id, token);
    callback(null, token);
}

function generateJWTTokenPdf(id, callback) {
    const payload = {
        _id: id,
    };
    console.log('The Hex Id String:', payload);
    let token = jwt.sign(payload, SECRET, {
        expiresIn: 604800 * 20 //20 weeks
    });
    token = 'JWT ' + token;

    console.info('Successfully created an access token', id, token);
    callback(null, token);
}

function generateJWTTokenMember(email, name, companyId, companyName, callback) {

    console.log('Email', email);
    const payload = {
        email: email,
        name: name,
        companyId: companyId,
        companyName: companyName
    };
    console.log('The Hex Id String:', payload);
    let token = jwt.sign(payload, SECRET, {
        expiresIn: 604800 * 20 //20 weeks
    });
    token = 'JWT ' + token;

    console.info('Successfully created an access token', email, token);
    callback(null, token);
}

module.exports = {
    validateMobileNo: validateMobileNo,
    validateEmail: validateEmail,
    hashPassword: hashPassword,
    decodeAuthString: decodeAuthString,
    generateJWTToken: generateJWTToken,
    generateJWTTokenMember: generateJWTTokenMember,
    generateJWTTokenPdf: generateJWTTokenPdf
};
