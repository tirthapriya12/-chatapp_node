class User {

    constructor(name, email, password, phone, id, friends, onlineStatus) {
        this.password = password;
        this.name = name; // user name
        this.email = email; // user phone
        this._id = id; // unique id in db
        this.friends = friends; // ids of friends
        this.phone = phone;
        this.online = onlineStatus;
    }

    getUserId() {
        return this._id;
    }
    getUserPhone() {
        return this.phone;
    }
    getUserEmail(){
        return this.email;
    }
    getUserName() {
        return this.name;
    }
    getUserFriends() {
        return this.friends;
    }
    addFriend(userId) {
        this.friends.push(userId);
    }
}

module.exports = User;