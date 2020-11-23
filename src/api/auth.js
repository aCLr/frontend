import axios from "axios";

export default {
  login(login, password) {
    return axios.post("api/v1/users/login", {
      params: {
        login,
        password
      }
    });
  },
  register(login, password) {
    return axios.post(`api/v1/users/register`, {
      login,
      password
    });
  }
};
