#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { ReviewsApiStack } = require('../lib/reviews-api-stack');

const app = new cdk.App();
new ReviewsApiStack(app, 'ReviewsApiStack', {
  
});