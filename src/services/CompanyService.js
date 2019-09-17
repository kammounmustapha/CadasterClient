import AuthService from "../layouts/AuthService";
export default class CompanyService {
  constructor(domain) {
    this.domain = domain || "http://localhost:3000"; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.authService = new AuthService();
  }

  addCompany(company) {
    return this.fetch(`${this.domain}/company`, {
      method: "POST",
      body: JSON.stringify(company)
    }).then(res => {
      return Promise.resolve(res);
    });
  }
  deleteCompany(id) {
    return this.fetch(`${this.domain}/company/${id}`, {
      method: "DELETE"
    }).then(res => {
      return Promise.resolve(res);
    });
  }
  updateCompany(id, updatedCompany) {
    return this.fetch(`${this.domain}/company/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedCompany)
    }).then(res => {
      return Promise.resolve(res);
    });
  }

  async getById(id) {
    return await this.fetch(`${this.domain}/company/${id}`, {
      method: "GET"
    });
  }
  getAll() {
    try {
      return this.fetch(`${this.domain}/company`, {
        method: "GET"
      });
    } catch (err) {}
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

    return (
      fetch(url, {
        headers,
        ...options
      })
        // .then(this._checkStatus)
        .then(response => response.json())
    );
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
