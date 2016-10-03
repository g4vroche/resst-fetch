'use strict';

module.exports = {

    "handle": function(request, assigner){
        var params = Object.assign({}, request, {
            headers: new Headers(request.headers)
        });


        return new Promise(function(resolve, reject){

            fetch(new Request(params.uri, params))
            .then(function(response){
                response.text().then(function(text){
                    resolve(assigner(formatResponse(response, text)));
                    }
                )
            })
            .catch(function(response){
                reject(assigner(formatResponse(response)));
            });
        });
    }
};


function formatResponse(response, text){
    var result = {
        "headers": {},
        "status": {
            "code": response.status,
            "message": response.statusText
        },
        "body": text
    };

    response.headers.forEach( function(value, key) { result.headers[key] = value;} );

    return result;
}

