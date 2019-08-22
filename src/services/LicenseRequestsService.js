import AuthService from "../layouts/AuthService";
export default class LicenseRequestsService {
  constructor(domain) {
    this.domain = domain || "http://localhost:3000"; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.authService = new AuthService();
  }

  addApplication(licenseApplication) {
    return this.fetch(`${this.domain}/licenseApplication`, {
      method: "POST",
      body: JSON.stringify(licenseApplication)
    }).then(res => {
      return Promise.resolve(res);
    });
  }
  deleteApplication(id) {
    return this.fetch(`${this.domain}/licenseApplication/${id}`, {
      method: "DELETE"
    }).then(res => {
      return Promise.resolve(res);
    });
  }

  updateApplication(id, updatedApplication) {
    return this.fetch(`${this.domain}/licenseApplication/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedApplication)
    }).then(res => {
      return Promise.resolve(res);
    });
  }
  async getById(id) {
    return await this.fetch(`${this.domain}/licenseApplication/${id}`, {
      method: "GET"
    }).then(res => {
      return Promise.resolve(res);
    });
  }
  getAllByUser() {
    var array = [];
    this.getAll().then(res => {
      res.docs.map(element => {
        if (
          element.properties.user._id === this.authService.getUserProfile._id
        ) {
          array.push(element);
        }
      });
    });
    return array;
  }
  async getAll() {
    return await this.fetch(`${this.domain}/licenseApplication`, {
      method: "GET"
    });
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.authService.loggedIn()) {
      headers["Authorization"] = this.authService.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
