import axios from "axios";
import { GetSourcesListRequest } from "@/pb/sources_pb";
import { SourcesServiceClient } from "@/pb/sources_grpc_web_pb";

var client = new SourcesServiceClient(  "http://" + window.location.hostname + ":" + window.location.port, null, null)

export default {
  deleteSource(sourceId) {
    return axios.delete(`api/v1/sources/${sourceId}`);
  },
  subscribeOnSource(sourceId) {
    return axios.put(`api/v1/sources/${sourceId}`);
  },
  loadSources() {
    return new Promise((resolve, reject) => {
      let request = new GetSourcesListRequest();
      client.getSourcesList(request, {"token": "123123"}, (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      })
    })
  },
  makeSearchQuery(query) {
    return axios.get("api/v1/sources/search", {
      params: { origin: query }
    });
  }
};
