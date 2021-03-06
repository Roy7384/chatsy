class User {
  constructor(userData, peerId) {
    this.peerId = peerId
    this.socketId = null;

    this.userId = userData[0].id,
    this.email = userData[0].email,
    this.interests = new Set(userData.map(row => row.label))
  }
}

module.exports = User;