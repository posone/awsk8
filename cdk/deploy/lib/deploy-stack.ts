import * as ec2 from '@aws-cdk/aws-ec2';
import * as eks from '@aws-cdk/aws-eks';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export class DeployStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const primaryRegion = 'eu-west-1';

    const clusterAdmin = new iam.Role(this, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
      });

    const cluster = new eks.Cluster(this, 'hello-eks', {
      clusterName: `demo-eks`,
      mastersRole: clusterAdmin,
      version: eks.KubernetesVersion.V1_21,
      defaultCapacity: 2
    });

    cluster.addAutoScalingGroupCapacity('spot-group', {
      instanceType: new ec2.InstanceType('m5.xlarge'),
      spotPrice: cdk.Stack.of(this).region==primaryRegion ? '0.248' : '0.192'
    });
    
    // apply a kubernetes manifest to the cluster
    cluster.addManifest('mypod', {
      apiVersion: 'v1',
      kind: 'Pod',
      metadata: { name: 'mypod' },
      spec: {
        containers: [
          {
            name: 'hello',
            image: 'paulbouwer/hello-kubernetes:1.5',
            ports: [ { containerPort: 8080 } ],
          },
        ],
      },
    });
  }
}
