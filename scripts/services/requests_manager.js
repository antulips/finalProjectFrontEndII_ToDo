class RequestManager {
  static url = 'https://ctd-todo-api.herokuapp.com/v1';

  static getToken() {
    return localStorage.getItem('token');
  }

  static get(endPoint) {
    return fetch(this.url + endPoint, {
      headers: {
        authorization: RequestManager.getToken()
      }
    }).then(response => {
      return response.json();
    })
  }

  static post(endPoint, body) {
    return fetch(this.url + endPoint, {
      method: 'POST',
      headers: {
        authorization: RequestManager.getToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(response => {
      return response.json();
    })
  }

  static put(endPoint, body) {
    return fetch(this.url + endPoint, {
      method: 'PUT',
      headers: {
        authorization: RequestManager.getToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(response => {
      return response.json();
    })
  }

  static delete(endPoint) {
    return fetch(this.url + endPoint, {
      method: 'DELETE',
      headers: {
        authorization: RequestManager.getToken()
      }
    }).then(response => {
      return response.json();
    })
  }
}