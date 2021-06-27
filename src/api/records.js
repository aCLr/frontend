import { GetRecordsListRequest, GetRecordsPreviewRequest, MarkRecordRequest, RecordsQuery } from "@/pb/records_pb";
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
        request.setQuery(RecordsQuery.RECORDS_QUERY_ALL);
        break;
      case "starred":
        request.setQuery(RecordsQuery.RECORDS_QUERY_STARRED);
        break;
      default:
        request.setQuery(RecordsQuery.RECORDS_QUERY_UNDEFINED);
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
    return client.markRecord(request, {})
  }
};
