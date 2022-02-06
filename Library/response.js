export function success(body, statusCode = 200) {
    if (statusCode < 200 || statusCode > 299) {
        return new Error(`Status code ${statusCode} is not in the Success HTTP Status code range.`);
    }

    return buildResponse(statusCode, body);
}

export function clientError(body, statusCode = 400) {
    if (statusCode < 400 || statusCode > 499) {
        return new Error(
            `Status code ${statusCode} is not in the Client Error HTTP Status code range.`
        );
    }
    return buildResponse(statusCode, body);
}

export function failure(body, statusCode = 500) {
    console.log('Error stack trace::: ', body);
    // return new Error(
    //   `Status code ${statusCode} is not in the Server Error HTTP Status code range.`
    // );
    return buildResponse(statusCode, body);
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': "'GET, POST,OPTIONS'",
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        },
        body: JSON.stringify(body),
    };
}

// module.exports.success = success;
// module.exports.clientError = clientError;
// module.exports.failure = failure;
