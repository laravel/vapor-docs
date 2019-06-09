# Networks

[[toc]]

## Introduction

Networks house your databases, caches, jumpboxes, and occasionally applications within AWS. In general, although they are displayed in the Vapor UI for you to review, you are not required to interact with networks directly when using Vapor. When you create a project in a region that does not contain any previous Vapor projects, Vapor automatically begins provisioning a network for you.

## Jumpboxes

Some Vapor resources, such as private databases or cache clusters, may not be accessed from the public Internet. Instead, they can only be accessed by a machine with their network. This can make it cumbersome to inspect and manipulate these resources during development. To mitigate this inconvenience, Vapor allows you to create jumpboxes. Jumpboxes are very small, SSH accessible servers that are placed within your private network.

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

If you application interacts with a private database or a cache cluster, your network will require a NAT Gateway. It sounds complicated, but don't worry, Vapor takes care of the heavy lifting. In summary, when a serverless application needs to interact with one of these resources, AWS requires us to place that application within that region's network. By default, this network has no access to the outside Internet, meaning any outgoing API calls from your application will fail. Not good.

### Managing NAT Gateways

Anytime you deploy an application that lists a private database or cache cluster as an attached resource within its `vapor.yml` file, Vapor will automatically ensure that the network associated with that database / cache contains a NAT Gateway. If it doesn't, Vapor will automatically begin provisioning one. Unfortunately, AWS bills for NAT Gateways by the hour, resulting in a monthly fee of about $32 / month.

To totally avoid using NAT Gateways, you can use publicly accessible RDS databases (Vapor automatically assigns a long, random password) and a DynamoDB cache table, which Vapor automatically creates for each of your projects.

When you delete a private database or cache cluster, and that resource is the last private resource on a given network, Vapor will automatically schedule a job to remove the NAT Gateway from the associated network, thus removing it from your AWS bill. However, you may also manually add or remove NAT Gateways from your networks using the Vapor UI or using the `network:nat` and `network:delete-nat` CLI commands.
