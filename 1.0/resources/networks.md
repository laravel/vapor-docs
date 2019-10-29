# Networks

[[toc]]

## Introduction

Networks house your databases, caches, jumpboxes, and occasionally applications within AWS. In general, although they are displayed in the Vapor UI for you to review, you are not required to interact with networks directly when using Vapor. When you create a project in a region that does not contain any previous Vapor projects, Vapor automatically begins provisioning a network for you.

### Attaching A Network To An Environment

Typically, you do not need to manually add a `network` directive to your `vapor.yml` file; however, sometimes you may want to manually specify that a Vapor environment should be placed within a given network. This may be the case when you are accessing private AWS resources, such as ElasticSearch, that are not created through Vapor. To place an environment within a network, add the `network` directive to your `vapor.yml` configuration file:

```yaml
id: 3
name: vapor-app
environments:
    production:
        network: my-network
        build:
            - 'composer install --no-dev'
```

## Jumpboxes

Some Vapor resources, such as private databases or cache clusters, may not be accessed from the public Internet. Instead, they can only be accessed by a machine within their network. This can make it cumbersome to inspect and manipulate these resources during development. To mitigate this inconvenience, Vapor allows you to create jumpboxes. Jumpboxes are very small, SSH accessible servers that are placed within your private network.

You may create a jumpbox via the Vapor UI's network detail screen or using the `jump` CLI command:

```bash
vapor jump my-jumpbox
```

Once the jumpbox has been created, Vapor will provide you with the private SSH key needed to access the jumpbox. You should connect to the jumpbox via SSH as the `ec2-user` user and the private SSH key.

:::tip Using Jumpboxes

For practical examples of using jumpboxes to make your serverless life easier, check out the [database](./databases.md#using-databases) and [cache](./caches.md#using-caches) documentation.
:::

## NAT Gateways

### What Are They?

If your application interacts with a private database or a cache cluster, your network will require a NAT Gateway. It sounds complicated, but don't worry, Vapor takes care of the heavy lifting. In summary, when a serverless application needs to interact with one of these resources, AWS requires us to place that application within that region's network. By default, this network has no access to the outside Internet, meaning any outgoing API calls from your application will fail. Not good.

### Managing NAT Gateways

Anytime you deploy an application that lists a private database or cache cluster as an attached resource within its `vapor.yml` file, Vapor will automatically ensure that the network associated with that database / cache contains a NAT Gateway. If it doesn't, Vapor will automatically begin provisioning one. Unfortunately, AWS bills for NAT Gateways by the hour, resulting in a monthly fee of about $32 / month.

To totally avoid using NAT Gateways, you can use publicly accessible RDS databases (Vapor automatically assigns a long, random password) and a [DynamoDB cache table](./caches.md#dynamodb-caches), which Vapor automatically creates for each of your projects.

When you delete a private database or cache cluster, and that resource is the last private resource on a given network, Vapor will automatically schedule a job to remove the NAT Gateway from the associated network, thus removing it from your AWS bill. However, you may also manually add or remove NAT Gateways from your networks using the Vapor UI or using the `network:nat` and `network:delete-nat` CLI commands.

## Load Balancers

By default, Vapor routes HTTP traffic to your serverless applications using AWS API Gateway. When using this service, AWS only bills you based on the amount of requests your application receives. However, at very high scale, API Gateway can become more expensive than your Lambda functions themselves.

As an alternative to API Gateway, you may route traffic to your application using an Application Load Balancer, which provides large cost savings at scale. For example, if an application receives about 1 billion requests per month, using an Application Load Balancer will save about $4,000 on the application's monthly Amazon bill.

### Creating Load Balancers

You may create load balancers using the Vapor UI or using the `balancer` CLI command. When using the CLI command:

```bash
vapor balancer my-balancer
```

### Using Load Balancers

To attach a load balancer to an environment, add a `balancer` key to the environment's configuration in your `vapor.yml` file and deploy your application. The value of this key should be the name of the load balancer.

```yaml
id: 3
name: vapor-app
environments:
    production:
        balancer: my-balancer
        build:
            - 'composer install --no-dev'
```


:::tip Load Balancer Certificates

By default, Vapor creates all SSL certificates in the `us-east-1` region, regardless of the region of your project. When your application is using API Gateway, AWS will automatically replicate your certificate to all regions behind the scenes.

However, when using an Application Load Balancer to route traffic to your application, you will need to create a certificate in the region that the project is actually deployed to. If you are creating a certificate in the Vapor UI, you can do this by checking the "For Load Balancer" checkbox when creating the certificate.
:::

### Deleting Load Balancers

Load balancers may be deleted via the Vapor UI or using the `balancer:delete` CLI command:

```bash
vapor balancer:delete my-balancer
```
