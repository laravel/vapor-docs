# Queues

[[toc]]

## Introduction

Laravel's queues are one of the framework's most powerful features. With Vapor, you can continue writing and dispatching queued jobs exactly as you would in a traditional server-hosted Laravel application. The only difference is that Vapor will automatically scale your queue processing throughput on-demand within seconds:

```php
use App\Jobs\ProcessPodcast;

ProcessPodcast::dispatch($pocast);
```

When using Vapor, your application will use the AWS SQS service, which is already a first-party queue driver within Laravel. Vapor will automatically configure your deployed application's to use this queue driver by injecting the proper Laravel environment variables. You do not need to perform any additional configuration.

:::danger Queued Job Time Limits

Currently, serverless applications on AWS may only process a single request (web or queue) for a maximum of 15 minutes. If your queued jobs take longer than 15 minutes, you will need to either chunk your job's work into smaller pieces, or consider another deployment solution for your application.
:::

## Queue Concurrency

By default, Vapor will allow your queue to process jobs at max concurrency, which is typically 1,000 concurrent jobs executing at the same time. If you would like to reduce the maximum queue concurrency, you may define the `queue-concurrency` option in the environment's `vapor.yml` configuration:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        queue-concurrency: 50
        build:
            - 'composer install --no-dev --classmap-authoritative'
```

## Queue Visibility Timeout

By default, if your queued job is not deleted or released within one minute of beginning to process, SQS will retry the job. To configure this "visibility timeout", you may define the `queue-timeout` option in the environment's `vapor.yml` configuration. For example, we may set this timeout to five minutes:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        queue-timeout: 300
        build:
            - 'composer install --no-dev --classmap-authoritative'
```

