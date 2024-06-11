const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String,
    },
    password: {
        type: String,
        minlength: 4
    },
    emailId: {
        type: String,
        unique: true,
        required: [true, ["Email Id Is Required"]],
        validate: {
            validator: function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            message: "Not a valid email id"
        }
    },
    emailIdVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    role: {
        type: String
    },
    verified: {
        type: String
    },
    user_name:{
        type: String
    },
    date: {
        type: String
    }
}, { timestamps: true });
const User = mongoose.model("users", UserSchema);
module.exports = {
    UserModel: User,
    UserSchema: UserSchema
};