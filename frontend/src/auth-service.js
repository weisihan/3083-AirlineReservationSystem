import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/"; // localhost ???

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(fname, lname, email, password) {
    return axios.post(API_URL + "signup", {
      fname,
      lname,
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
