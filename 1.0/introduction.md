# Introduction

[[toc]]

## What Is Vapor?

Laravel Vapor is an auto-scaling, serverless deployment platform for Laravel, powered by AWS Lambda. Manage your Laravel infrastructure on Vapor and fall in love with the scalability and simplicity of serverless. Vapor abstracts the complexity of managing Laravel applications on AWS Lambda, as well as interfacing those applications with SQS queues, databases, Redis clusters, networks, CloudFront CDN, and more.

In short, you can think of Vapor as [Laravel Forge](https://forge.laravel.com) for serverless technology.

## Account Creation

Before integrating Vapor into your application, you should create a Vapor account. If you are just collaborating with others on their projects, you are not required to have a Vapor subscription. To create and manage your own projects, you will need a Vapor subscription.

## Installing The Vapor CLI

You will deploy your Laravel Vapor applications using the [Vapor CLI](https://github.com/laravel/vapor-cli). This CLI may be installed globally or on a per-project basis. To install the CLI globally, you should download the latest release of the Vapor CLI "Phar" archive. To install the CLI for a single project, you may use Composer:

```bash
composer require laravel/vapor-cli
```

When the CLI is installed per project, you will likely need to execute it via the `vendor/bin` directory of your project, which is where Composer installs executables. For example, to view all of the available Vapor CLI commands, you may use the `list` command:

```bash
php vendor/bin/vapor list
```

:::tip Vapor CLI Alias

To save keystrokes when interacting with per-project installations of the Vapor CLI, you may add a shell alias to your operating system that aliases the `vapor` command to `php vendor/bin/vapor`.
:::

To learn more about a command and its arguments, execute the `help` command which the name of the command you wish to explore:

```bash
php vendor/bin/vapor help deploy
```

### Updating The CLI

If the Vapor CLI is installed for a specific project, you may update the CLI using Composer. If the Vapor CLI is globally installed via the Phar distribution, you should download a fresh copy of the Phar to update your installation.

## Installing The Vapor Core

The `laravel/vapor-core` [package](https://github.com/laravel/vapor-core) must be installed as a dependency of every Laravel application that is deployed using Vapor. This package contains various Vapor runtime files and a service provider to allow your application to run on Vapor. You may install the Vapor Core into your project using Composer:

```bash
composer require laravel/vapor-core
```

## Teams

When you create your Vapor account, a "Personal" team is automatically created for you. You can rename this team in your team settings. All projects, databases, caches, and other Vapor resources belong to a team. You are free to create as many teams as you wish via the Vapor UI or the `team` CLI command. There is no additional charge for creating teams, and they serve as a great way to organize your projects by client or topic.

### Collaborators

You can invite more people to your team via the "Team Settings" menu in the Vapor UI, or the `team:add` CLI command. When you add a new collaborator to your team via the Vapor UI, you may select the permissions to assign to that person. For example, you can prevent a given team member from deleting databases or caches.

You may remove collaborators from your team using the Vapor UI or `team:remove` CLI command.

## Linking With AWS

In order to deploy projects or create other resources using Vapor, you will need to link an active AWS account on your team's settings management page.

### IAM Permissions

To create the AWS access key and secret required by Vapor to manage resources on your AWS account, you will need to create a new IAM user within AWS. To create a new IAM user, navigate to the IAM service on your AWS dashboard. Once you are in the IAM dashboard, you may select "Users" from the left-side navigation panel.

Next, click the "Add user" button and choose a user name. When selecting an "Access type", select "Programmatic access". This instructs AWS IAM to issue a access key ID and secret access key for the IAM user. Then, click "Next".

On the permissions management screen, you may grant full administrator access to the IAM user by selecting the "Attach existing policies directly" option and and "AdministratorAccess" policy. Once the policy has been attached, you may click "Next".

Once the user is created, AWS will display the access key ID and secret access key for the user. These credentials may then be provided to Vapor so that AWS resources may be managed on your behalf.

:::tip IAM Access

Since Vapor manages many types of resources across more than a dozen AWS services, it may be convenient to create a user with the `AdministratorAccess` policy. If desired, you may create a separate AWS account to house this user and contain all of your Vapor resources.
:::

#### Granting Granular Permissions

To white-list all operations for all services required by Vapor, you should grant the following permissions to a policy:

- acm:*
- apigateway:*
- cloudformation:*
- cloudfront:*
- dynamodb:*
- ec2:*
- elasticache:*
- events:*
- lambda:*
- logs:*
- rds:*
- route53:*
- s3:*
- ses:*
- sqs:*
- ssm:*

If you would like to create a user with the specific permissions required by Vapor, you should create a policy for the user with the following permissions. **Please note that Vapor's required permissions could change in the future:**

- acm:deleteCertificate
- acm:describeCertificate
- acm:importCertificate
- acm:requestCertificate
- acm:resendValidationEmail
- apigateway:*
- cloudformation:createStack
- cloudformation:deleteStack
- cloudformation:describeStacks
- cloudformation:updateStack
- cloudfront:createDistribution
- cloudfront:deleteDistribution
- cloudfront:getDistribution
- cloudfront:getDistributionConfig
- cloudfront:updateDistribution
- cloudwatch:getMetricStatistics
- dynamodb:createTable
- dynamodb:deleteTable
- dynamodb:describeTable
- ec2:describeAvailabilityZones
- ec2:describeInstances
- ec2:describeVpcs
- ec2:importKeyPair
- ec2:runInstances
- ec2:terminateInstances
- elasticache:createReplicationGroup
- elasticache:deleteReplicationGroup
- elasticache:describeReplicationGroups
- elasticache:modifyReplicationGroupShardConfiguration
- events:deleteRule
- events:describeRule
- events:listTargetsByRule
- events:putRule
- events:putTargets
- events:removeTargets
- lambda:addPermission
- lambda:createEventSourceMapping
- lambda:deleteAlias
- lambda:deleteFunction
- lambda:getPolicy
- lambda:invoke
- lambda:listEventSourceMappings
- lambda:updateAlias
- lambda:updateFunctionCode
- logs:filterLogEvents
- rds:createDBCluster
- rds:createDBInstance
- rds:deleteDBCluster
- rds:deleteDBInstance
- rds:describeDBClusters
- rds:describeDBInstances
- rds:modifyDBCluster
- rds:modifyDBInstance
- rds:restoreDBClusterToPointInTime
- rds:restoreDBInstanceToPointInTime
- route53:changeResourceRecordSets
- route53:deleteHostedZone
- route53:listHostedZonesByName
- route53:listResourceRecordSets
- s3:copyObject
- s3:deleteMatchingObjects
- s3:deleteObject
- s3:doesBucketExist
- s3:doesObjectExist
- s3:putBucketCors
- s3:putBucketLifecycleConfiguration
- ses:listIdentities
- ses:verifyDomainDkim
- ses:verifyDomainIdentity
- sqs:createQueue
- sqs:getQueueUrl
- sqs:setQueueAttributes
- ssm:deleteParameter
- ssm:getParametersByPath
- ssm:putParameter


