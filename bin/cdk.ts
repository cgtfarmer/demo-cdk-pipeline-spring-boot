#!/usr/bin/env node

import { App } from 'aws-cdk-lib';

import { CdkPipelineStack } from '../cdk/stacks/cdk-pipeline-stack';

const app = new App();

new CdkPipelineStack(app, 'CdkPipelineStack', {
  env: {
    // account: '123456789012',
    region: 'us-east-2',
  }
});
