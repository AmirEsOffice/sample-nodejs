function User(firstName, lastName, email, password,avatar) {  
    this.firstName = firstName || null;
    this.lastName = lastName || null;
    this.email = email || null;
    this.password = password || null;
    this.avatar = avatar || null;
    
}

module.exports = User;