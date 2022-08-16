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

:::danger Duplicate Queue Names

When using custom queue names, it is important to ensure the names are unique between projects and environments. Vapor automatically configures a Lambda function for each environment to process jobs from the queue. When the queue is shared, there is no guarantee which environment will process jobs on that queue.
:::

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

By default, Vapor will allow your queue to process jobs at max concurrency, which is typically 1,000 concurrent jobs executing at the same time. If you would like to reduce the maximum queue concurrency, you may define the `queue-concurrency` option in the environment's `vapor.yml` configuration:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        queue-concurrency: 50
        build:
            - 'composer install --no-dev'
```

When using multiple custom queues, the `queue-concurrency` option defines the maximum concurrency per queue. For example, if you were to define two custom queues and a `queue-concurrency` of 100 the total maximum concurrency will be 200.

## Queue Visibility Timeout

By default, if your queued job is not deleted or released within one minute of beginning to process, SQS will retry the job. To configure this "visibility timeout", you may define the `queue-timeout` option in the environment's `vapor.yml` configuration. For example, we may set this timeout to five minutes:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        queue-timeout: 300
        build:
            - 'composer install --no-dev'
```

## Queue Memory

You may use the `queue-memory` option in your environment's `vapor.yml` configuration to define the memory that should be available to your queue worker Lambda function:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        queue-memory: 1024
        build:
            - 'composer install --no-dev'
```

## Queue Database Connections

By default, database connections do not persist between queued jobs, ensuring that the database does not get overwhelmed with active connections. However, if your database can handle a large number of connections and you want to reduce the overhead involved in creating a database connection on each job, you may define the `queue-database-session-persist` option in your environment's `vapor.yml` configuration file to instruct Vapor to reuse the same database connection across jobs:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        queue-database-session-persist: true
        build:
            - 'composer install --no-dev'
```

## Monitoring Jobs

If you have installed the [Vapor UI dashboard package](./../introduction.html#installing-the-vapor-ui-dashboard), you may access the `/vapor-ui/jobs/metrics` URI to monitor queue jobs.

Within the Vapor UI dashboard, you can monitor (in real-time) the number of processed jobs, failed jobs, and pending jobs for your Vapor application. In addition, it includes charts providing job statistics over the last 24 hours, allowing you to understand better the trends of your queue.

Furthermore, you may access the `/vapor-ui/jobs/failed` to view the list of failed jobs, their details, job IDs, connections, queues, failures times, and other information about the jobs. From this screen, you may choose to retry or delete the failed job.
