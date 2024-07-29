const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: String,
    uname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]\w+/.test(v);
            },
            message: props => `This is not a valid password!`
        },
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /([0-9]){10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isOnline: Boolean,
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

class User {

    constructor(name, uname, password, phone, friends, onlineStatus) {
        this.password = password;
        this.name = name; // user name
        this.uname = uname; // username unique id
        this._id = id; // unique id in db
        this.friends = friends; // ids of friends
        this.phone = phone;
        this.isOnline = onlineStatus;
    }

    addFriend(userId) {
        this.friends.push(userId);
    }
    
}

UserSchema.loadClass(User);

module.exports = {
    User: User,
    UserModel: new model('User', UserSchema)
};