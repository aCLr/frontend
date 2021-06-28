import { RegisterRequest, LoginRequest } from "@/pb/users_pb";
import { authInterceptor } from "./interceptors";
import {UsersServicePromiseClient} from "@/pb/users_grpc_web_pb";

const client = new UsersServicePromiseClient("http://" + window.location.hostname + ":" + window.location.port, null, {'unaryInterceptors': [authInterceptor]})

export default {
  async login(login, password) {
    let request = new LoginRequest();
    request.setLogin(login);
    request.setPassword(password);
    return client.login(request, {})
  },
  register(login, password) {
    let request = new RegisterRequest()
    request.setLogin(login);
    request.setPassword(password);
    return client.register(request, {})
  }
};
