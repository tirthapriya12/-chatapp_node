const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

class Group {

    constructor(name, id, users, admins) {
        this.name = name;
        this._id = id;
        this.users = users;
        this.admins = admins;
    }

    /**Adds user to {this} group */
    addUsers(users) {

        for (let user of users) {
            this.users.push(user);
        }
    }
    /**provided with a userId, this function removes users from the group */
    removeUser(userId) {
        for (let user of this.getUsers()) {
            if (user._id === userId) {
                this.users.splice(this.users.indexOf(user), 1);
            }
        }
    }

    /** return group name of {this}*/
    get groupName() {
        return this.name;
    }

    set groupName(name) {
        this.name = name;
    }
    get users() {
        return this.users;
    }
    get admins() {
        return this.admins;
    }
}

GroupSchema.loadClass(Group);


module.exports = {
    _Group: Group,
    Group: new mongoose.model('Group', GroupSchema)
};
