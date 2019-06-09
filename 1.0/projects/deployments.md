# Deployments

[[toc]]

## Introduction

Of course, one of the primary features of Laravel Vapor are atomic, zero-downtime deployments. Unlike many other features of Vapor, deployments are **only initiated via the Vapor CLI**. During deployment, Vapor will run the `build` steps of your `vapor.yml` file on the local machine that the deployment is running on. This might be your personal machine or a continuous integration platform.

## Initiating Deployments

To initiate a deployment, execute the `deploy` CLI command from the root of your application:

```bash
vapor deploy production
```

## Build Hooks

You may define build hooks for an environment using the `build` key within your `vapor.yml` file. These commands are executed on the local machine that the deployment is running on and may be used to prepare your application for deployment. During deployment, your application is built within a temporary `.vapor` directory that is created by the CLI and all of your `build` commands will run within that temporary directory:

```yaml
id: 3
name: vapor-app
environments:
    production:
        memory: 1024
        database: vapor-app
        cache: vapor-cache
        build:
            - 'composer install --no-dev --classmap-authoritative'
            - 'php artisan event:cache'
        deploy:
            - 'php artisan migrate --force'
```

## Deploy Hooks

You may define deployment hooks for an environment using the `deploy` key within your `vapor.yml` file. These commands are executed against the deployed environment **before it is activated for general availability**. If any of these commands fail, the deployment will not be activated. You may review the output / logs from your deployment hooks via the Vapor UI's deployment detail screen:

```yaml
id: 3
name: vapor-app
environments:
    production:
        memory: 1024
        database: vapor-app
        cache: vapor-cache
        build:
            - 'composer install --no-dev --classmap-authoritative'
            - 'php artisan event:cache'
        deploy:
            - 'php artisan migrate --force'
```

## Redeploying

Sometimes you may need to simply redeploy a given environment without rebuilding or redeploying it. For example, you may wish to do this after updating an environment variable. To accomplish this, you may use the Vapor UI or the `redeploy` CLI command:

```bash
vapor redeploy production
```

## Rollbacks

To rollback to a previous deployment, you may select the deployment in the Vapor UI and click the "Rollback To" button, or you may use the `rollback` CLI command. The `rollback` command's "--select" option will allow you to select which deployment to rollback to from a list of recent deployments. If the `rollback` command is executed without this option, it will simply rollback to the most previous successful deployment:

```bash
vapor rollback production

vapor rollback production --select
```

:::warning Variables, Secrets, & Rollbacks

When rolling back to a previous deployment, Vapor will use the environment's variables and secrets as they existed at the time the deployment you're rolling back to was originally deployed.
:::

