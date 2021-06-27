import { GetSourcesListRequest, UnsubscribeRequest, SubscribeRequest, SearchSourcesRequest } from "@/pb/sources_pb";
import { authInterceptor } from "./interceptors";
import { SourcesServicePromiseClient } from "@/pb/sources_grpc_web_pb";

const client = new SourcesServicePromiseClient(  "http://" + window.location.hostname + ":" + window.location.port, null, {'unaryInterceptors': [authInterceptor]});

export default {
  unsubscribe(sourceId) {
    let request = new UnsubscribeRequest();
    request.setSourceId(sourceId)
    return client.unsubscribe(request, {})
  },
  subscribe(sourceId) {
    let request = new SubscribeRequest();
    request.setSourceId(sourceId)
    return client.subscribe(request, {})
  },
  loadSources() {
    let request = new GetSourcesListRequest();
    return client.getSourcesList(request, {})
  },
  search(query) {
    let request = new SearchSourcesRequest();
    request.setQuery(query)
    return client.searchSources(request, {})
  }
};
