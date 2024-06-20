const messages = {
    general:{
        invalidEmail: {
            message: {
                header: 'Invalid Email',
                body: 'Please enter email in the correct format'
            }
        },
        requiredFields: {
            message: {
                header: 'All fields are required',
                body: 'Please enter value in all the fields'
            }
        }
    },
    registration: {
        userVerification: {
            error: 'Error: Invalid JWT token',
            success: 'User has been verified',
            doesntExist: 'User Does not exist'
        },
        duplicateEmail: {
            message:{
                header: 'Email should be unique',
                body: 'This email has already been taken'
            }
        },
        duplicateUsername: 'This username has already been taken',
        success:  (email) => {
            return {
                message:{
                    header: 'Registration Success',
                    body: `Thank you for Registering with CASSA. We have sent an email verification to ${email}. Please open the email, confirm you are a real person, and complete your profile. You will not be able to gain access to CASSA until this step is completed.`
                }
            }
        }
    },
    login: {
        incorrectCreds: {
            message:{
                header: 'Error',
                body: 'These credentials do not match our records'
            }
        },
        incorrectPassword: {
            message: {
                header: 'Error',
                body: 'These credentials do not match our records'
            }
        },
        emailNotVerified: {
            message:{
                header: 'Incomplete Profile',
                body: 'Please complete your profile via web before login'
            }
        },
        success: (jwt, firstName, lastName, profileImg, id) => {
            return {
                id: id,
                body: 'Success',
                token: jwt,
                firstName: firstName,
                lastName: lastName,
                profileImg: `${process.env.BASE_URL}/uploads/users/45x45/${profileImg}`
            }
        }
    },
    forgotPassword: {
        emailRequired: {
            message:{
                header: 'Email field Required',
                body: 'Please enter the email address'
            }
        },
        userNotFound: {
            message: {
                header: 'Invalid Email',
                body: `We can't find a user with that email address`
            }
        },
        success: () => {
            return {
                message: {
                    header: 'Success',
                    body: 'We have emailed you a password reset link'
                }
            }
        }
    }
};

module.exports = messages;