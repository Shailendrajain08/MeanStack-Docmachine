_ = require("underscore");
msg = require('./messages');
emailRegex = require('regex-email');
const resp = require('./respHelper');

/**
 * @param  {} props
 * @param  {} val
 * @param  {} cb
 * @param  {} message
 */

const checkUser = (prop, res) => {
    return new Promise((resolve, reject) => {
        console.log("prop",prop.headers.authorization)
        // if(prop.headers.authorization){
        //     resolve(prop.user[0]._doc || prop.user[0]._doc);
        // }
        // else{
        //     resp.errorResponse({success: false, message: "User Not found"});
        //     // reject()
        // }
    })
};

const getPropAdv = (props, def) => {
    return props.reduce((val, prop) => {
        if(val){
            return val = val[prop] || def || undefined
        }
        else
            return val = def || undefined
    });
};


let getProp = (props, val, cb, message) => {

    let ifErr = (prop) => {
        let err = {
            "status": "error",
            "message": message || `value ${prop} is not defined`
        };
        if (cb) {
            console.log(err);
            cb(err);
        } else
            return undefined
    };

    let ifProp = (prop, val) => {
        if (val[prop])
            return val[prop];
        else
            ifErr(prop)
    };

    for (let i = 0; i < props.length - 1; i++) {
        if (val)
            val = ifProp(props[i + 1], val);
        else {
            ifErr(props[i + 1]);
        }
    }

    return val
};
/**
 * @param  {arr: {}, obj: {}, res: {}, msg: {}} payload
 * @param  {} afterProcessing
 */
let processRequestOptions = (payload, afterProcessing) => {
    if(payload, afterProcessing) {
        let difference = _.difference(payload.arr, _.allKeys(payload.obj));
        if (getProp(["difference", "length"], difference)) {
            let message = payload.message || msg.general.requiredFields;
            resp.missingBody(payload.res, payload.message || msg.general.requiredFields)
        } else {
            if(payload.options){
                if(payload.options.email){
                    if(emailRegex.test(payload.obj.email)){
                        afterProcessing(payload.obj);
                    }
                    else{
                        resp.errorResponse(payload.res, msg.general.invalidEmail);
                    }
                }
            }
            else
                afterProcessing(payload.obj);
        }
    }
    else
        return undefined;
};
/**
 * @param  {} obj
 * @param  {} arr
 * @param  {} res
 * @param  {} options
 * @param  {} afterProcessing
 */
let processRequest = (obj, arr, res, options, afterProcessing) => {
    let difference = _.difference(arr, _.allKeys(obj));
    if (getProp(["difference", "length"], difference)) {
        resp.missingBody(res, `Doesn't have the following properties: ${difference}`)
    } else {
        afterProcessing(obj);
    }
};


/**
 * @param  {} obj
 * @param  {} arr
 * @param  {} afterGetting
 * @param  {} message
 */

let checkProps = (obj, arr, message) => {
    return new Promise((resolve, reject) => {
        if(obj){
            let difference = _.difference(arr, _.allKeys(obj));
            if (getProp(["difference", "length"], difference)) {
                console.dir(`Doesn't have the foll properties: ${difference}`);
                reject({
                    "status": "Error",
                    "message": message || `Doesn't have the following properties: ${difference}`
                })
            } else {
                resolve(obj)
            }
        }
        else{
            reject({
                "status": "Error",
                "message": message || "object not found"
            })
        }
    })
};

// let checkProps = (obj, arr, afterGetting, message) => {
//     let difference = _.difference(arr, _.allKeys(obj))
//     if (getProp(["difference", "length"], difference)) {
//         console.dir(`Doesn't have the foll properties: ${difference}`)
//         afterGetting({
//             "status": "Error",
//             "message": message || `Doesn't have the following properties: ${difference}`
//         })
//     } else {
//         afterGetting(obj)
//     }
// }

let addProp = (props, base, val) => {
    let ele = {};
    for (let i = 0; i < props.length; i++) {
        if (!ifProp(base[props[i]]))
            ele = base[props[i]] = {}
    }
    ele[props[props.length - 1]]
};

let safelyParseJSON = (json) => {
    // This function cannot be optimised, it's best to
    // keep it small!
    var parsed;
    console.log('The PayTM Response is: ', json);

    try {
        parsed = JSON.parse(json)
    } catch (e) {
        parsed = {
            "status": "failed parsing JSON"
        }
    }

    return parsed // Could be undefined!
};



module.exports = {
    getProp: getProp,
    checkProps: checkProps,
    safelyParseJSON: safelyParseJSON,
    processRequest: processRequest,
    processRequestOptions: processRequestOptions,
    getPropAdv: getPropAdv,
    gp: getPropAdv,
    checkUser: checkUser
};
