/**
 * @fileoverview gRPC-Web generated client stub for users
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.users = require('./users_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.users.UsersServiceClient =
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
proto.users.UsersServicePromiseClient =
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
 *   !proto.users.LoginRequest,
 *   !proto.users.LoginResponse>}
 */
const methodDescriptor_UsersService_Login = new grpc.web.MethodDescriptor(
  '/users.UsersService/Login',
  grpc.web.MethodType.UNARY,
  proto.users.LoginRequest,
  proto.users.LoginResponse,
  /**
   * @param {!proto.users.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.users.LoginResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.users.LoginRequest,
 *   !proto.users.LoginResponse>}
 */
const methodInfo_UsersService_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.users.LoginResponse,
  /**
   * @param {!proto.users.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.users.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.users.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.users.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.users.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.users.UsersServiceClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/users.UsersService/Login',
      request,
      metadata || {},
      methodDescriptor_UsersService_Login,
      callback);
};


/**
 * @param {!proto.users.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.users.LoginResponse>}
 *     Promise that resolves to the response
 */
proto.users.UsersServicePromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/users.UsersService/Login',
      request,
      metadata || {},
      methodDescriptor_UsersService_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.users.RegisterRequest,
 *   !proto.users.RegisterResponse>}
 */
const methodDescriptor_UsersService_Register = new grpc.web.MethodDescriptor(
  '/users.UsersService/Register',
  grpc.web.MethodType.UNARY,
  proto.users.RegisterRequest,
  proto.users.RegisterResponse,
  /**
   * @param {!proto.users.RegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.users.RegisterResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.users.RegisterRequest,
 *   !proto.users.RegisterResponse>}
 */
const methodInfo_UsersService_Register = new grpc.web.AbstractClientBase.MethodInfo(
  proto.users.RegisterResponse,
  /**
   * @param {!proto.users.RegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.users.RegisterResponse.deserializeBinary
);


/**
 * @param {!proto.users.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.users.RegisterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.users.RegisterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.users.UsersServiceClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/users.UsersService/Register',
      request,
      metadata || {},
      methodDescriptor_UsersService_Register,
      callback);
};


/**
 * @param {!proto.users.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.users.RegisterResponse>}
 *     Promise that resolves to the response
 */
proto.users.UsersServicePromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/users.UsersService/Register',
      request,
      metadata || {},
      methodDescriptor_UsersService_Register);
};


module.exports = proto.users;

