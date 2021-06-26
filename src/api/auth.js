import axios from "axios";
import {LoginRequest} from "@/pb/users_pb";
import {UsersService} from "@/pb/users_grpc_web_pb";

var client = new UsersService("http://" + window.location.hostname + ":8000", null, null)
export default {
  async login(login, password) {
    let request = new LoginRequest();
    request.setLogin(login);
    request.setPassword(password);
    let promise = new Promise((resolve, reject) => {
      client.Login(request, {}, (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })

    });
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
