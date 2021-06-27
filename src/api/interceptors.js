const authUnaryInterceptor = function() {};

/** @override */
authUnaryInterceptor.prototype.intercept = function(request, invoker) {
    const metadata = request.getMetadata();
    metadata['token'] = '123123';
    // After the RPC returns successfully, update the response.
    return invoker(request)
};

export let authInterceptor = new authUnaryInterceptor();
