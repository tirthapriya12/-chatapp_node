let db = require('../utils/DBHandler');
let User = require('../models/User');
class UserController {

    userSignUp(req, res, next) {

        let errors, response;
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password must be at least 6 characters long').len(6);
        req.sanitize('email').normalizeEmail({
            gmail_remove_dots: false
        });

        req.getValidationResult().then(result => {

            if (result.isEmpty()) {
                this.createUser(req.body, (data) => {
                    response = { signUp: true };
                    res.end(JSON.stringify(response));
                });

            }
            else {
                errors = result.array().map(function (elem) {
                    return elem.msg;
                });
                res.end(JSON.stringify(errors));
            }
        });
    }

    createUser(reqBody, callback) {
        
        let { name, email, password, phone } = reqBody;
        let user = new User(name,email,password,phone);
        db.insertDocument('User', user, (res) => {
            console.log(res);
            if (callback) callback(res);
        })
    }
}

const userController = new UserController()
module.exports = userController;