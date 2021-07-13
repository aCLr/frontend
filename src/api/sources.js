import { SetSourceTagsRequest, SearchTagsRequest, GetSourceByIdRequest, GetSourcesListRequest, UnsubscribeRequest, SubscribeRequest, SearchSourcesRequest, MoveToFolderRequest } from "../pb/sources_pb";
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

  getById(sourceId) {
    let request = new GetSourceByIdRequest();
    request.setId(sourceId)
    return client.getSourceById(request, {})
  },

  search(query) {
    let request = new SearchSourcesRequest();
    request.setQuery(query)
    return client.searchSources(request, {})
  },

  setFolder(sourceId, folderId) {
    let request = new MoveToFolderRequest();
    request.setSourceId(sourceId);
    request.setFolderId(folderId);
    return client.moveToFolder(request, {})
  },

  searchTags(query, limit) {
    let request = new SearchTagsRequest();
    request.setSearch(query)
    request.setLimit(limit)
    return client.searchTags(request, {})
  },

  setTags(sourceId, tags) {
    let request = new SetSourceTagsRequest();
    request.setSourceId(sourceId);
    request.setTagsList(tags);
    return client.setSourceTags(request, {})
  }
};
