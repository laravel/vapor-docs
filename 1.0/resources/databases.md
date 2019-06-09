# Databases

[[toc]]

## Introduction

Vapor allows you to easily create and manage RDS and Aurora Serverless databases directly from the Vapor UI or using the Vapor CLI. **Database backups are automatically performed and you may restore a database to any point in time (down to the second) within the backup retention window.**

## Creating Databases

You may create databases using the Vapor UI or using the `database` CLI command. When using the CLI command, the command will prompt you for more details about the database such as its desired performance class and storage space.

```bash
vapor database my-application-db
```

### The Default Database

Vapor will automatically create a "vapor" database within each database instance that you create. You are free to create additional databases using the database management tool of your choice.

### Database Types

When creating Vapor databases, you may choose from two different types of databases: fixed size and auto-scaling serverless databases.

#### Fixed Size Databases

Fixed sized databases are RDS MySQL 8.0 databases that have a fixed amount of RAM and disk space. These databases may be scaled up or down after creation, but not without incurring downtime.

In addition, these databases may be publicly accessible (with a long, random password automatically assigned by Vapor) or private. Private databases may not typically be accessed from the public Internet. To access them from your local machine, you will need to create a Vapor jumpbox.

#### Serverless Databases

Serverless databases are auto-scaling Aurora MySQL 5.6 databases which do not have a fixed amount of RAM or disk space. Instead, these databases automatically scale based on the needs of your application. At their smallest scale, they are allocated 1GB of RAM.

:::warning Serverless Databases

AWS requires all serverless databases to be private, meaning Vapor will place any application that uses them in a network with a [NAT Gateway](./networks.md#nat-gateways).
:::

## Using Databases

To attach a database to an environment, add a `database` key to the environment's configuration in your `vapor.yml` file. The value of this key should be the name of the database:

```yaml
id: 3
name: vapor-app
environments:
    production:
        database: my-application-db
        build:
            - 'composer install --no-dev --classmap-authoritative'
        deploy:
            - 'php artisan migrate --force'

```

When the environment is deployed, Vapor will automatically inject the necessary Laravel environment variables for connecting to the database, allowing your application to start using it immediately!

### Connecting To Private Databases Locally

If you would like to connect to your private database from your local machine, you can either use a Vapor "jumpbox" or the `database:shell` CLI command.

#### Jumpboxes

Jumpboxes are very small, SSH accessible servers that are placed within your private network. Once a jumpbox has been created, you may configure your database management tool to connect to your database through the jumpbox SSH connection. You may create a jumpbox via the Vapor UI's network detail screen or using the `jump` CLI command:

```bash
vapor jump my-jumpbox
```

Once the jumpbox has been created, Vapor will provide you with the private SSH key needed to access the jumpbox. You should connect to the jumpbox via SSH as the `ec2-user` user and the private SSH key. For example, TablePlus may be configured in this way:

TODO: Screenshot

## Database Users

## Scaling Databases

## Restoring Databases

## Deleting Databases
