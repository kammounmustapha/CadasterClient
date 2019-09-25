import decode from "jwt-decode";
export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || "http://localhost:3000"; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
  getUserProfile() {
    const current_user = JSON.parse(localStorage.getItem("user"));
    return current_user;
  }
  getUsersList() {
    return this.fetch("${this.domain}/users/usersList", {
      method: "GET"
    }).then(res => {
      return Promise.resolve(res);
    });
  }
  deleteUser(userId) {
    return this.fetch(`${this.domain}/users/userDelete`, {
      method: "DELETE",
      body: JSON.stringify({ userId: userId })
    }).then(res => {
      return Promise.resolve(res);
    });
  }

  addUser(user) {
    console.log(user);
    return this.fetch(`${this.domain}/users/signup`, {
      method: "POST",
      body: JSON.stringify({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        role: user.role
      })
    }).then(res => {
      return Promise.resolve(res);
    });
  }
  login(email, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/users/signin`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => {
      this.setToken(res.token); // Setting the token in localStorage
      localStorage.setItem("user", JSON.stringify(res.user));

      return Promise.resolve(res);
    });
  }
  getAllUsers() {
    return this.fetch(`${this.domain}/users`, {
      method: "GET"
    }).then(res => {
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    const { fullName, email, role } = decode(this.getToken());
    return { fullName, email, role };
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = this.getToken();
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
