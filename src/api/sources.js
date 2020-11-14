import axios from "axios";

export default {
  loadSources() {
    return axios.get("http://127.0.0.1:8088/api/v1/sources/");
  },
  makeSearchQuery(query) {
    return axios.post("http://127.0.0.1:8088/api/v1/sources/", {
      origin: query
    });
  }
};
