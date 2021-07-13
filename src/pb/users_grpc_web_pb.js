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


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.users.GetFoldersRequest,
 *   !proto.users.GetFoldersResponse>}
 */
const methodDescriptor_UsersService_GetFolders = new grpc.web.MethodDescriptor(
  '/users.UsersService/GetFolders',
  grpc.web.MethodType.UNARY,
  proto.users.GetFoldersRequest,
  proto.users.GetFoldersResponse,
  /**
   * @param {!proto.users.GetFoldersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.users.GetFoldersResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.users.GetFoldersRequest,
 *   !proto.users.GetFoldersResponse>}
 */
const methodInfo_UsersService_GetFolders = new grpc.web.AbstractClientBase.MethodInfo(
  proto.users.GetFoldersResponse,
  /**
   * @param {!proto.users.GetFoldersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.users.GetFoldersResponse.deserializeBinary
);


/**
 * @param {!proto.users.GetFoldersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.users.GetFoldersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.users.GetFoldersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.users.UsersServiceClient.prototype.getFolders =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/users.UsersService/GetFolders',
      request,
      metadata || {},
      methodDescriptor_UsersService_GetFolders,
      callback);
};


/**
 * @param {!proto.users.GetFoldersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.users.GetFoldersResponse>}
 *     Promise that resolves to the response
 */
proto.users.UsersServicePromiseClient.prototype.getFolders =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/users.UsersService/GetFolders',
      request,
      metadata || {},
      methodDescriptor_UsersService_GetFolders);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.users.AddFolderRequest,
 *   !proto.users.AddFolderResponse>}
 */
const methodDescriptor_UsersService_AddFolder = new grpc.web.MethodDescriptor(
  '/users.UsersService/AddFolder',
  grpc.web.MethodType.UNARY,
  proto.users.AddFolderRequest,
  proto.users.AddFolderResponse,
  /**
   * @param {!proto.users.AddFolderRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.users.AddFolderResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.users.AddFolderRequest,
 *   !proto.users.AddFolderResponse>}
 */
const methodInfo_UsersService_AddFolder = new grpc.web.AbstractClientBase.MethodInfo(
  proto.users.AddFolderResponse,
  /**
   * @param {!proto.users.AddFolderRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.users.AddFolderResponse.deserializeBinary
);


/**
 * @param {!proto.users.AddFolderRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.users.AddFolderResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.users.AddFolderResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.users.UsersServiceClient.prototype.addFolder =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/users.UsersService/AddFolder',
      request,
      metadata || {},
      methodDescriptor_UsersService_AddFolder,
      callback);
};


/**
 * @param {!proto.users.AddFolderRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.users.AddFolderResponse>}
 *     Promise that resolves to the response
 */
proto.users.UsersServicePromiseClient.prototype.addFolder =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/users.UsersService/AddFolder',
      request,
      metadata || {},
      methodDescriptor_UsersService_AddFolder);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.users.RemoveFolderRequest,
 *   !proto.users.RemoveFolderResponse>}
 */
const methodDescriptor_UsersService_RemoveFolder = new grpc.web.MethodDescriptor(
  '/users.UsersService/RemoveFolder',
  grpc.web.MethodType.UNARY,
  proto.users.RemoveFolderRequest,
  proto.users.RemoveFolderResponse,
  /**
   * @param {!proto.users.RemoveFolderRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.users.RemoveFolderResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.users.RemoveFolderRequest,
 *   !proto.users.RemoveFolderResponse>}
 */
const methodInfo_UsersService_RemoveFolder = new grpc.web.AbstractClientBase.MethodInfo(
  proto.users.RemoveFolderResponse,
  /**
   * @param {!proto.users.RemoveFolderRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.users.RemoveFolderResponse.deserializeBinary
);


/**
 * @param {!proto.users.RemoveFolderRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.users.RemoveFolderResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.users.RemoveFolderResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.users.UsersServiceClient.prototype.removeFolder =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/users.UsersService/RemoveFolder',
      request,
      metadata || {},
      methodDescriptor_UsersService_RemoveFolder,
      callback);
};


/**
 * @param {!proto.users.RemoveFolderRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.users.RemoveFolderResponse>}
 *     Promise that resolves to the response
 */
proto.users.UsersServicePromiseClient.prototype.removeFolder =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/users.UsersService/RemoveFolder',
      request,
      metadata || {},
      methodDescriptor_UsersService_RemoveFolder);
};


module.exports = proto.users;

