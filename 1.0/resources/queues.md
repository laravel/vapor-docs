# Queues

[[toc]]

## Introduction

Laravel's queues are one of the framework's most powerful features. With Vapor, you can continue writing and dispatching queued jobs exactly as you would in a traditional server-hosted Laravel application. The only difference is that Vapor will automatically scale your queue processing throughput on-demand within seconds:

```php
use App\Jobs\ProcessPodcast;

ProcessPodcast::dispatch($podcast);
```

When using Vapor, your application will use the AWS SQS service, which is already a first-party queue driver within Laravel. Vapor will automatically configure your deployed application to use this queue driver by injecting the proper Laravel environment variables. You do not need to perform any additional configuration.

:::danger Queued Job Time Limits

Currently, serverless applications on AWS may only process a single request (web or queue) for a maximum of 15 minutes. If your queued jobs take longer than 15 minutes, you will need to either chunk your job's work into smaller pieces or consider another deployment solution for your application. In addition, a queued job may not have a "delay" greater than 15 minutes.
:::

## Custom Queue Names

By default, Vapor will create an SQS queue that has the same name as your project and inject the proper environment variables to make this queue the default queue. If you would like to specify your own custom queue names that Vapor should create instead, you may define a `queues` option in your environment's `vapor.yml` configuration. The first queue in the list of queues will be considered your "default" queue and will automatically be set as the `SQS_QUEUE` environment variable:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        queues:
            - emails
            - invoices
```

### Disabling The Queue

If your application does not use queues, you may set the environment's `queues` option to `false`:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        queues: false
        build:
            - 'composer install --no-dev'
```

## Queue Concurrency

By default, Vapor will allow your queue to process jobs at max concurrency, which is typically 1,000 concurrent jobs executing at the same time. If you would like to reduce the maximum queue concurrency, you may define the `cli-concurrency` option in the environment's `vapor.yml` configuration:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        cli-concurrency: 50
        build:
            - 'composer install --no-dev'
```

## Queue Visibility Timeout

By default, if your queued job is not deleted or released within one minute of beginning to process, SQS will retry the job. To configure this "visibility timeout", you may define the `cli-timeout` option in the environment's `vapor.yml` configuration. For example, we may set this timeout to five minutes:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        cli-timeout: 300
        build:
            - 'composer install --no-dev'
```

