import axios from "axios";

export default {
  deleteSource(sourceId) {
    return axios.delete(`api/v1/sources/${sourceId}`);
  },
  subscribeOnSource(sourceId) {
    return axios.put(`api/v1/sources/${sourceId}`);
  },
  loadSources() {
    return axios.get("api/v1/sources/");
  },
  makeSearchQuery(query) {
    return axios.get("api/v1/sources/search", {
      params: { origin: query }
    });
  }
};
