import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { InstanceClass, InstanceSize, InstanceType, Vpc } from 'aws-cdk-lib/aws-ec2';
import {
  AssetImage,
  Cluster, FargateService, FargateTaskDefinition
} from 'aws-cdk-lib/aws-ecs';
import path = require('path');

export class ComputeStack extends Stack {

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'Vpc', {
      // ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16')
      maxAzs: 1
    });

    const cluster = new Cluster(this, 'Cluster', {
      vpc: vpc,
      capacity: {
        instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.NANO),
        desiredCapacity: 1,
        maxCapacity: 1,
      }
    });

    // const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef');
    const taskDefinition = new FargateTaskDefinition(this, 'FargateTaskDef', {
      memoryLimitMiB: 512,
    });

    taskDefinition.addContainer('DefaultContainer', {
      // image: ContainerImage.fromEcrRepository(ecrRepository, tagOrDigest),
      image: new AssetImage(path.join(__dirname), {
        target: 'demo-cdk-pipeline-spring-boot',
        // buildArgs: {
        //   key: 'value'
        // }
      }),
      memoryLimitMiB: 512,
    });

    // Instantiate an Amazon ECS Service
    // const ecsService = new Ec2Service(this, 'Service', {
    //   cluster,
    //   taskDefinition,
    // });

    const fargateService = new FargateService(this, 'FargateService', {
      cluster,
      taskDefinition,
      assignPublicIp: true,
    });
  }
}
