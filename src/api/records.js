import { GetRecordsListRequest, GetRecordsPreviewRequest, MarkRecordRequest } from "@/pb/records_pb";
import { authInterceptor } from "./interceptors";
import { RecordsServicePromiseClient } from "@/pb/records_grpc_web_pb";

const client = new RecordsServicePromiseClient("http://" + window.location.hostname + ":" + window.location.port, null, {'unaryInterceptors': [authInterceptor]});

export default {
  getRecords({ limit, offset, query, sourceId = null }) {
    let request = new GetRecordsListRequest()
    request.setLimit(limit);
    request.setOffset(offset);
    switch (query) {
      case "all":
        request.setOnlyStarred(false);
        break;
      case "starred":
        request.setOnlyStarred(true);
        break;
    }
    request.setSourceId(sourceId);
    return client.getRecordsList(request, {})
  },

  getRecordsPreview({ sourceId }) {
    let request = new GetRecordsPreviewRequest();
    request.setSourceId(sourceId);
    return client.getRecordsPreview(request, {})
  },

  toggleStarred(recordId, newValue) {
    let request = new MarkRecordRequest()
    request.setStarred(newValue);
    request.setRecordId(recordId);
    return client.markRecord(request, {})
  }
};
