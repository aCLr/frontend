/**
 * @fileoverview gRPC-Web generated client stub for records
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.records = require('./records_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.records.RecordsServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.records.RecordsServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.records.GetRecordsListRequest,
 *   !proto.records.GetRecordsListResponse>}
 */
const methodDescriptor_RecordsService_GetRecordsList = new grpc.web.MethodDescriptor(
  '/records.RecordsService/GetRecordsList',
  grpc.web.MethodType.UNARY,
  proto.records.GetRecordsListRequest,
  proto.records.GetRecordsListResponse,
  /**
   * @param {!proto.records.GetRecordsListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.records.GetRecordsListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.records.GetRecordsListRequest,
 *   !proto.records.GetRecordsListResponse>}
 */
const methodInfo_RecordsService_GetRecordsList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.records.GetRecordsListResponse,
  /**
   * @param {!proto.records.GetRecordsListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.records.GetRecordsListResponse.deserializeBinary
);


/**
 * @param {!proto.records.GetRecordsListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.records.GetRecordsListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.records.GetRecordsListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.records.RecordsServiceClient.prototype.getRecordsList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/records.RecordsService/GetRecordsList',
      request,
      metadata || {},
      methodDescriptor_RecordsService_GetRecordsList,
      callback);
};


/**
 * @param {!proto.records.GetRecordsListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.records.GetRecordsListResponse>}
 *     Promise that resolves to the response
 */
proto.records.RecordsServicePromiseClient.prototype.getRecordsList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/records.RecordsService/GetRecordsList',
      request,
      metadata || {},
      methodDescriptor_RecordsService_GetRecordsList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.records.GetRecordsPreviewRequest,
 *   !proto.records.GetRecordsPreviewResponse>}
 */
const methodDescriptor_RecordsService_GetRecordsPreview = new grpc.web.MethodDescriptor(
  '/records.RecordsService/GetRecordsPreview',
  grpc.web.MethodType.UNARY,
  proto.records.GetRecordsPreviewRequest,
  proto.records.GetRecordsPreviewResponse,
  /**
   * @param {!proto.records.GetRecordsPreviewRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.records.GetRecordsPreviewResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.records.GetRecordsPreviewRequest,
 *   !proto.records.GetRecordsPreviewResponse>}
 */
const methodInfo_RecordsService_GetRecordsPreview = new grpc.web.AbstractClientBase.MethodInfo(
  proto.records.GetRecordsPreviewResponse,
  /**
   * @param {!proto.records.GetRecordsPreviewRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.records.GetRecordsPreviewResponse.deserializeBinary
);


/**
 * @param {!proto.records.GetRecordsPreviewRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.records.GetRecordsPreviewResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.records.GetRecordsPreviewResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.records.RecordsServiceClient.prototype.getRecordsPreview =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/records.RecordsService/GetRecordsPreview',
      request,
      metadata || {},
      methodDescriptor_RecordsService_GetRecordsPreview,
      callback);
};


/**
 * @param {!proto.records.GetRecordsPreviewRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.records.GetRecordsPreviewResponse>}
 *     Promise that resolves to the response
 */
proto.records.RecordsServicePromiseClient.prototype.getRecordsPreview =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/records.RecordsService/GetRecordsPreview',
      request,
      metadata || {},
      methodDescriptor_RecordsService_GetRecordsPreview);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.records.MarkRecordRequest,
 *   !proto.records.MarkRecordResponse>}
 */
const methodDescriptor_RecordsService_MarkRecord = new grpc.web.MethodDescriptor(
  '/records.RecordsService/MarkRecord',
  grpc.web.MethodType.UNARY,
  proto.records.MarkRecordRequest,
  proto.records.MarkRecordResponse,
  /**
   * @param {!proto.records.MarkRecordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.records.MarkRecordResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.records.MarkRecordRequest,
 *   !proto.records.MarkRecordResponse>}
 */
const methodInfo_RecordsService_MarkRecord = new grpc.web.AbstractClientBase.MethodInfo(
  proto.records.MarkRecordResponse,
  /**
   * @param {!proto.records.MarkRecordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.records.MarkRecordResponse.deserializeBinary
);


/**
 * @param {!proto.records.MarkRecordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.records.MarkRecordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.records.MarkRecordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.records.RecordsServiceClient.prototype.markRecord =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/records.RecordsService/MarkRecord',
      request,
      metadata || {},
      methodDescriptor_RecordsService_MarkRecord,
      callback);
};


/**
 * @param {!proto.records.MarkRecordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.records.MarkRecordResponse>}
 *     Promise that resolves to the response
 */
proto.records.RecordsServicePromiseClient.prototype.markRecord =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/records.RecordsService/MarkRecord',
      request,
      metadata || {},
      methodDescriptor_RecordsService_MarkRecord);
};


module.exports = proto.records;

