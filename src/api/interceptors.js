import store from "../store/index";
const authUnaryInterceptor = function() {};

/** @override */
authUnaryInterceptor.prototype.intercept = function(request, invoker) {
    const metadata = request.getMetadata();
    metadata['token'] = store.state.auth.token;
    // After the RPC returns successfully, update the response.
    return invoker(request)
};

export let authInterceptor = new authUnaryInterceptor();
