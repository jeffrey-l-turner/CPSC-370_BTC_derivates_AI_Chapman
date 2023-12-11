class User {
  constructor(name, birthday, messages) {
    this.publicData = {
      name: name,
      birthday: birthday
    };
    this.privateData = {
      messages: messages
    };
  }

  getPublicData() {
    return this.publicData;
  }

  getPrivateData() {
    return this.privateData;
  }

  addMessage(message) {
    this.privateData.messages.push(message);
  }
}

export default User;
