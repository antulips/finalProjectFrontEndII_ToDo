class UserData {
  static url = 'https://ctd-todo-api.herokuapp.com/v1';

  constructor() {
    this.firstName = null;
    this.lastName = null;
    this.password = null;
    this.email = null;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastname) {
    this.lastName = lastname;
  }

  setPassword(password) {
    this.password = password;
  }

  setEmail(email) {
    this.email = email;
  }

  static getUser(endPoint) {
    return fetch(this.url + endPoint, {
      headers: {
        authorization: RequestManager.getToken()
      }
    }).then(response => {
      return response.json();
    })
  }
}