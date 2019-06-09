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

## Database Users

## Scaling Databases

## Restoring Databases

## Deleting Databases
