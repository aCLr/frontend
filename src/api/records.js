import axios from "axios";

export default {
  getRecords({ limit, offset, query, sourceId = null }) {
    return axios.get("api/v1/records/", {
      params: {
        limit,
        offset,
        query,
        source_id: sourceId
      }
    });
  },
  getRecordsPreview({ sourceId }) {
    return axios.get("api/v1/records/preview", {
      params: {
        source_id: sourceId
      }
    });
  },
  toggleStarred(recordId, newValue) {
    return axios.post(`api/v1/records/${recordId}`, {
      starred: newValue
    });
  }
};
