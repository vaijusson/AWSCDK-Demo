var AWS = require('aws-sdk');
const sqs = new AWS.SQS();

function validateMessage(message) {
    if (!message.productid || !message.title || !message.text || !message.rating) {
        return false;
    }
}

async function writeQueueMessage(message) {
    var params = {
        MessageBody: JSON.stringify(message, null, 2),
        QueueUrl: process.env.SQS_QUEUE_URL,
    }

    await sqs.sendMessage(params).promise()
}

exports.handler = async(event) => {
    try {
        if (!validateMessage(JSON.parse(event.body))) {
            throw new Error("invalid review data");
        }

        await writeQueueMessage(event.body);

        return {
            statusCode: 200,
            body: "Review Accepted"
        }
    }
    catch (e) {
        return {
            statusCode: 400,
            body: e.message
        };
    }
};