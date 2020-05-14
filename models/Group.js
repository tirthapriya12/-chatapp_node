class Group {

    constructor(name, id, users) {
        this.name = name;
        this._id = id;
        this.users = users;
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
    getGroupName() {
        return this.name;
    }
    getUsers() {
        return this.users;
    }
}
module.exports = Group;
