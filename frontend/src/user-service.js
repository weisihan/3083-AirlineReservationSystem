import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/api/auth/"; // localhost ???

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "home");
  }

  getUserHome() {
    return axios.get(API_URL + "clienthome", { headers: authHeader() });
  }

  getStaffHome() {
    return axios.get(API_URL + "staffhome", { headers: authHeader() });
  }
}

export default new UserService();
