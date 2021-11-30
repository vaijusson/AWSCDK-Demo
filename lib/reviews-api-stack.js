const cdk = require('@aws-cdk/core');
const sqs = require('@aws-cdk/aws-sqs');
const lambda = require('@aws-cdk/aws-lambda');
const apigateway = require('@aws-cdk/aws-apigateway');
const path = require('path');

class ReviewsApiStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const queue = new sqs.Queue(this, 'myQueue');
        const backend = new lambda.Function(this, 'myFunction', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            environment: {'SQS_QUEUE_URL': queue.queueUrl},
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambda'))
        });

        queue.grantSendMessages(backend);

        const api = new apigateway.LambdaRestApi(this,'myApi', {
            handler: backend
        })
    }
}

module.exports = { ReviewsApiStack }

