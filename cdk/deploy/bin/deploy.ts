#!/usr/bin/env node
import 'source-map-support/register';
import { DeployStack } from '../lib/deploy-stack';
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';


const app = new cdk.App();

new DeployStack(app, `ClusterStack-test`, {
  env: {
    account: "072297576584",
  },
})
