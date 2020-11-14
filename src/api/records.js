import axios from "axios";

export default {
  getRecords(limit, offset, query, sourceId = null) {
    return axios.get("http://127.0.0.1:8088/api/v1/records/", {
      params: {
        limit: limit,
        offset: offset,
        query: query,
        source_id: sourceId
      }
    });
  },
  toggleStarred(recordId, newValue) {
    return axios.post(`http://127.0.0.1:8088/api/v1/records/${recordId}`, {
      starred: newValue
    });
  }
};
