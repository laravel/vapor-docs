# Environments

[[toc]]

## Introduction

As you may have noticed, projects do not contain much information or resources themselves. All of your deployments and invoked commands are stored within environments. Each project may have as many environments as needed.

Typically, you will have an environment for "production", and a "staging" environment for testing your application. However, don't be afraid to create more environments for testing new features without interrupting your main staging environment.

## Creating Environments

Environments may be created using the `env` Vapor CLI command:

```bash
vapor env my-environment
```

This command will add a new environment entry to your project's `vapor.yml` file that you may deploy when ready:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        build:
            - 'composer install --no-dev'
    my-environment:
        build:
            - 'composer install --no-dev'
```

In addition to our native runtimes, Vapor supports Docker image deployments. If you would like an environment to use a Docker image runtime instead of the default Vapor runtime, use the `--docker` option when creating your environment:

```bash
vapor env my-environment --docker
```

This command will create a `my-environment.Dockerfile` file in your application's root directory.

## Environment Variables

Each environment contains a set of environment variables that provide crucial information to your application during execution, just like the variables present in your application's local `.env` file.

### Updating Environment Variables

You may update an environment's variables via the Vapor UI or using the `env:pull` and `env:push` CLI commands. The `env:pull` command may be used to pull down an environment file for a given environment:

```bash
vapor env:pull production
```

Once this command has been executed, a `.env.{environment}` file will be placed in your application's root directory. To update the environment's variables, simply open and edit this file. When you are done editing the variables, use the `env:push` command to push the variables back to Vapor:

```bash
vapor env:push production
```

### Vapor Environment Variables

Vapor automatically injects a variety of environment variables based on your environment's configured database, cache, etc. You will not see these environment variables when you manage your environment, and any variables you manually define will override Vapor's automatically injected variables.

If you are using the DotEnv library's [variable nesting](https://github.com/vlucas/phpdotenv#nesting-variables) feature to reference environment variables that Vapor is injecting, you should replace these references with literal values instead. Since Vapor's injected environment variables do not belong to the environment file, they can not be referenced using the nesting feature.

:::tip Variables & Deployments

After updating an environment's variables, the new variables will not be utilized until the application is deployed again. In addition, when rolling back to a previous deployment, Vapor will use the variables as they existed at the time the deployment you're rolling back to was originally deployed.
:::

:::warning Environment Variable Limits

Due to AWS Lambda limitations, your environment variables may only be 4kb in total. You should use "secrets" to store very large environment variables.
:::

### Reserved Environment Variables

The following environment variables are reserved and may not be added to your environment:

- _HANDLER
- AWS_ACCESS_KEY_ID
- AWS_EXECUTION_ENV
- AWS_LAMBDA_FUNCTION_MEMORY_SIZE
- AWS_LAMBDA_FUNCTION_NAME
- AWS_LAMBDA_FUNCTION_VERSION
- AWS_LAMBDA_LOG_GROUP_NAME
- AWS_LAMBDA_LOG_STREAM_NAME
- AWS_LAMBDA_RUNTIME_API
- AWS_REGION
- AWS_SECRET_ACCESS_KEY
- AWS_SESSION_TOKEN
- LAMBDA_RUNTIME_DIR
- LAMBDA_TASK_ROOT
- TZ

In addition, environment variables should not contain `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, or `AWS_SESSION_TOKEN` in their names. For example: `MY_SERVICE_AWS_SECRET_ACCESS_KEY`.

## Secrets

Due to AWS Lambda limitations, your environment variables may only be 4kb in total. However, "secrets" may be much larger, making them a perfect way to store large environment variables such as Laravel Passport keys. You may create secrets via the Vapor UI or the `secret` CLI command:

```bash
vapor secret production
```

Behind the scenes, your secrets are stored as a `SecureString` in [AWS Systems Manager (SSM) > Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html).

:::tip Secrets & Deployments

After updating an environment's secrets, the new secrets will not be utilized until the application is deployed again. In addition, when rolling back to a previous deployment, Vapor will use the secrets as they existed at the time the deployment you're rolling back to was originally deployed.
:::

### Passport Keys

Storing Laravel Passport keys is a common use-case for secrets. You may easily add your project's Passport keys as secrets using the `secret:passport` CLI command:

```bash
vapor secret:passport production
```

## Vanity URLs

Each environment is assigned a unique "vanity URL" which you may use to access the application immediately after it is deployed. When serving these URLs, Vapor automatically adds "no-index" headers to the response so they are not indexed by search engines.

In addition, these secret URLs will continue to work even when an application is in maintenance mode, allowing you to test your application before disabling maintenance mode and restoring general access.

## Custom Domains

Of course, as cool as they are, you don't want to share your vanity URL with the world. You likely want to attach your own custom domain to an environment. To do so, you'll first need to create a [DNS zone](./../domains/dns.md) for the domain. Next, you need to create a [certificate](./../domains/certificates.md) for the domain. All Vapor applications are required to utilize SSL. Don't worry, Vapor's certificates are free and automatically renew.

After creating a certificate, you may attach the domain to your environment using the `domain` configuration option in your `vapor.yml` file. When attaching a domain to an environment, it is not necessary to provide the `www` sub-domain:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        domain: example.com
        build:
            - 'composer install --no-dev'
```

During deployment, Vapor will configure the environment to handle requests on this domain and automatically add the necessary DNS records to the [DNS zone](./../domains/dns.md).

:::warning Self-Managed Domains

If you self-manage your domain's DNS records, Vapor will not be able to update the domain's DNS records automatically. Therefore, you should run the `vapor record:list domain-name.com` command to view the records that Vapor indicates are required for your domain and update your DNS records accordingly.
:::

:::warning Custom Domain Provisioning Time

Due to the nature of AWS CloudFront, custom domains often take 30-45 minutes to become fully active. So, do not worry if your custom domain is not immediately accessible after deployment.
:::

### Multiple Domains

Vapor allows you to attach multiple domains to a single project. Before doing so, ensure you have a valid certificate for each of the domains:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        domain:
            - example1.com
            - example2.com
        build:
            - 'composer install --no-dev'
```

### Wildcard Subdomains

You may attach a domain that supports wildcard subdomains to a Vapor environment if that environment is also using an [application load balancer](./../resources/networks.md#load-balancers) and you have a valid certificate for the domain. To attach a wildcard domain to your environment, specify a `*` as the subdomain:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        domain: '*.example.com'
        build:
            - 'composer install --no-dev'
```

## Maintenance Mode

When deploying a Laravel application using a traditional VPS like those managed by [Laravel Forge](https://forge.laravel.com), you may have used the `php artisan down` command to place your application in "maintenance mode". To place a Vapor environment in maintenance mode, you may use the Vapor UI or the `down` CLI command:

```bash
vapor down production
```

To remove an environment from maintenance mode, you may use the `up` command:

```bash
vapor up production
```

:::tip Maintenance Mode & Vanity URLs

When an environment is in maintenance mode, the environment's custom domain will display a maintenance mode splash screen; however, you may still access the environment via its "vanity URL"
:::

### Customizing The Maintenance Mode Screen

You may customize the maintenance mode splash screen for your application by placing a `503.html` file in your application's root directory.

## Commands

Commands allow you to execute an arbitrary Artisan command against an environment. You may issue a command via the Vapor UI or using the `command` CLI command. The `command` command will prompt you for the Artisan command you would like to run:

```bash
vapor command production

vapor command production --command="php artisan inspire"
```

By default, your command will timeout after one minute. You can configure the timeout of your CLI commands using the `cli-timeout` option within your `vapor.yml` file. This option allows you to specify the maximum number of seconds a CLI command should be allowed to run:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        cli-timeout: 20
        build:
            - 'composer install --no-dev'
```

## Memory

Vapor (via AWS Lambda) allocates CPU power to your Lambda function in proportion to the amount of memory configured for the application. You may increase or decrease the configured memory using the `memory` option in your environment's `vapor.yml` configuration:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        memory: 1024
        build:
            - 'composer install --no-dev'
```

:::warning Memory Increments

When configuring the memory for your Lambda function, you may define a value between 128 MB and 10,240 MB in 64-MB increments.
:::

## Concurrency

By default, Vapor will allow your application to process web requests at max concurrency, which is typically 1,000 requests executing at the same time at any given moment across all of your AWS Lambda functions in a given region. If you would like to reduce the maximum web concurrency, you may define the `concurrency` option in the environment's `vapor.yml` configuration. Additionally, if you need more than 1,000 concurrent requests, you can submit a limit increase request in the AWS Support Center console.

While maximum performance is certainly appealing, in some situations it may make sense to set this value to the maximum concurrency you reasonably expect for your particular application. Otherwise, a DDoS attack against your application could result in larger than expected AWS costs:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        concurrency: 50
        build:
            - 'composer install --no-dev'
```

## Provisioned Concurrency

By default, when an environment is deployed, the first request it receives may encounter "cold starts". These requests typically incur a penalty of a few seconds while AWS loads a serverless container to serve the request. Once a request has been served by that container, it is typically kept warm to serve further requests with no delay.

To mitigate this issue, Amazon supports "provisioned concurrency". When using this feature, the requested number of execution environments / containers will be provisioned and kept "warm" for you automatically, allowing them to immediately serve any incoming requests. To enable this feature, you may add a `capacity` configuration option to the environment in your `vapor.yml` file:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        capacity: 5
        build:
            - 'composer install --no-dev'
```

For more information on this feature and its pricing, please consult the [AWS documentation](https://aws.amazon.com/blogs/aws/new-provisioned-concurrency-for-lambda-functions/).

:::warning Warming

When using this feature, any `warm` values in your `vapor.yml` file will be ignored.
:::

## Prewarming

By default, when an environment is deployed, the first request it receives may encounter "cold starts". These requests typically incur a penalty of a few seconds while AWS loads a serverless container to serve the request. Once a request has been served by that container, it is typically kept warm to serve further requests with no delay.

To mitigate "cold starts" after a fresh deployment, Vapor allows you to define a `warm` configuration value for an environment in your `vapor.yml` file. The `warm` value represents how many serverless containers Vapor will "pre-warm" by making concurrent requests to the newly deployed application **before it is activated for public accessibility**. Vapor will continue to pre-warm this many containers every 5 minutes while the application is deployed so the specified number of containers are always ready to serve requests:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        warm: 10
        build:
            - 'composer install --no-dev'
```

## Firewall

You may instruct Vapor to automatically configure a firewall that provides basic protection against denial-of-service attacks targeting your environment, as well as protection against pervasive bot traffic that can consume your environment's resources.

Before getting started, keep in mind that Vapor's managed firewall inspects requests using the IP address from the web request origin. Therefore, this feature should only be used if the requests are not already being reversed proxied through a service such as Cloudflare. **If you are already using a reverse proxy, you should not use this feature**.

You may use Vapor's managed firewall by defining the `firewall` configuration option within your application's `vapor.yml` file:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        build:
            - 'composer install --no-dev'
        firewall:
            rate-limit: 1000
            bot-control:
                - CategorySearchEngine
                - CategorySocialMedia
                - CategoryScrapingFramework
```

### `rate-limit`

When using the `rate-limit` option, Vapor's managed firewall tracks the rate of requests for each originating IP address and blocks IPs with request rates over the given `rate-limit` value. In the example above, if the request count for an IP address exceeds 1,000 requests in any 5-minute time span then the firewall will temporarily block requests from that IP address with the `403 Forbidden` HTTP status code.

### `bot-control`

When using the `bot-control` option, Vapor's managed firewall blocks requests from pervasive bots, such as scrapers or search engines. You may customize the "category" of requests the `bot-control` should block by providing an `array` of categories within your application's `vapor.yml` file:

```yaml
firewall:
    bot-control:
        - CategoryAdvertising
        - CategoryArchiver
        - SignalNonBrowserUserAgent
```

Here is the list of available categories you may use:

| Category | Description |
| --- | --- |
| CategoryAdvertising | Blocks requests from bots that are used for advertising purposes\. |
| CategoryArchiver | Blocks requests from bots that are used for archiving purposes\. |
| CategoryContentFetcher | Blocks requests from bots that are fetching content on behalf of an end-user\. |
| CategoryHttpLibrary | Blocks requests from HTTP libraries that are often used by bots\. |
| CategoryLinkChecker | Blocks requests from bots that check for broken links\. |
| CategoryMiscellaneous | Blocks requests from miscellaneous bots\. |
| CategoryMonitoring | Blocks requests from bots that are used for monitoring purposes\. |
| CategoryScrapingFramework | Blocks requests from web scraping frameworks\. |
| CategorySecurity | Blocks requests from security\-related bots\. |
| CategorySeo | Blocks requests from bots that are used for search engine optimization\. |
| CategorySocialMedia | Blocks requests from bots that are used by social media platforms to provide content summaries\. Verified social media bots are not blocked\.  |
| CategorySearchEngine | Blocks requests from search engine bots\. Verified search engines are not blocked\.  |
| SignalAutomatedBrowser | Blocks requests with indications of an automated web browser\. |
| SignalKnownBotDataCenter | Blocks requests from data centers that are typically used by bots\. |
| SignalNonBrowserUserAgent | Blocks requests with user-agent strings that don't seem to be from a web browser\. |

---

:::warning API Gateway v2

Due to AWS limitations, Vapor's managed firewall does not support API Gateway v2.
:::

Behind the scenes, Vapor's managed firewall uses **[Amazon WAF](https://aws.amazon.com/waf/)**, creating a Web ACL with one rate-based rule per Vapor environment. Feel free to check out the AWS WAF documentation for more information about WAF and its pricing.

## Timeout

By default, Vapor will limit web request execution time to 10 seconds. If you would like to change the timeout value, you may add a `timeout` value (in seconds) to the environment's configuration. Note that AWS does not allow Lambda executions to process for more than 15 minutes:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        timeout: 20
        build:
            - 'composer install --no-dev'
```

:::tip Detecting Timeouts In Logs

Remember, you can use the [Vapor UI dashboard package](./../introduction.html#installing-the-vapor-ui-dashboard) to search for timeout occurrences.
:::

## Scheduler

Vapor automatically configures Laravel's task scheduler and instructs it to use the DynamoDB cache driver to avoid overlapping tasks, so no other configuration is required to begin leveraging Laravel's scheduled task feature.

If you would like to disable the scheduler, you may set an environment's `scheduler` option to `false`:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        scheduler: false
        build:
            - 'composer install --no-dev'
```

:::warning Log Messages

Due to Vapor limitations, log messages from scheduled tasks will not appear in AWS CloudWatch or Vapor UI. As a workaround, you should dispatch a queued job from your scheduled tasks and write log messages from your queued job.
:::

## Mail

Laravel provides a clean, simple email API. And, by default, Vapor will automatically configure your environment to use **[Amazon SES](https://aws.amazon.com/ses/)** as the default mail driver by injecting the proper Laravel environment variables during deployment. Of course, you may change the default mail driver by defining a different value for the `MAIL_MAILER` environment variable.

If you plan to use Amazon SES as your application's mail service, you should [attach a domain](#custom-domains) to your environment. Once attached and deployed, Vapor will automatically update the domain's DNS records so Amazon SES can validate the domain and configure DKIM. These DNS records are necessary to protect your reputation as a sender.

:::warning Self-Managed Domains

If you self-manage your domain's DNS records, Vapor will not be able to update the domain's DNS records automatically. Therefore, you should run the `vapor record:list domain-name.com` command to view the records that Vapor indicates are required for your domain and update your DNS records accordingly.
:::

By default, Vapor configures the "From Address" and "From Name" Laravel configuration settings with `hello@your-domain.com` and `Your Project Name`, respectively. Of course, you're free to modify these values by defining new values for the `MAIL_FROM_ADDRESS` and `MAIL_FROM_NAME` environment variables.

Finally, if you haven't used Amazon SES before, your SES account will be in "sandbox" mode. Sandbox mode only allows you to send emails to manually verified domains. To move out of SES sandbox mode, follow these instructions: **[https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html)**.

## Metrics

A variety of environment performance metrics may be found in the Vapor UI or using the `metrics` CLI command:

```bash
vapor metrics production
vapor metrics production 5m
vapor metrics production 30m
vapor metrics production 1h
vapor metrics production 8h
vapor metrics production 1d
vapor metrics production 3d
vapor metrics production 7d
vapor metrics production 1M
```

### Alarms

You may configure alarms for all environment metrics using the Vapor UI. These alarms will notify you via the notification method of your choice when an alarm's configured threshold is broken and when an alarm recovers.

## Runtime

The `runtime` configuration option allows you to specify the runtime a given environment runs on.

### Native Runtimes

The currently supported native runtimes are `php-7.3`, `php-7.4`, `php-7.4:al2`, `php-8.0`, and `php-8.0:al2`. The runtimes that are suffixed with `al2` use Amazon Linux 2 while those without the suffix use Amazon Linux 1:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        runtime: 'php-8.0:al2'
        build:
            - 'composer install --no-dev'
```

:::warning Amazon Linux 2

Using [Amazon Linux 2](https://aws.amazon.com/amazon-linux-2/) (`php-7.4:al2` or `php-8.0:al2`) is **highly recommended**, as Amazon Linux 1 is no longer maintained as of December 31, 2020.
:::

The following limitations apply to Vapor native runtimes:

- The application size, including the runtime itself, must not exceed 250MB.
- Additional PHP extensions or libraries (such as `imagick`) can not be installed.

### Docker Runtimes

Docker based runtimes allow you to package and deploy applications up to 10GB in size and allow you to install additional PHP extensions or libraries by updating the environment's corresponding `.Dockerfile`. For every new Docker based environment, Vapor adds a `.Dockerfile` file that uses one of Vapor's base images as a starting point for building your image. All of Vapor's Docker images are based on Alpine Linux:

```docker
FROM laravelphp/vapor:php80

COPY . /var/task
```

If you would like to use a Docker image instead of the Vapor native runtimes, set the `runtime` configuration option to `docker` within your `vapor.yml` file:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        runtime: docker
        build:
            - 'composer install --no-dev'
```

:::warning Migrating Existing Environments To A Docker Runtime

When migrating an existing environment to a Docker runtime, please keep in mind that you won't be able to revert that environment to the default Vapor Lambda runtime later. For that reason, you may want to create an environment for testing the Docker runtime first.
:::

Vapor will build, tag, and publish your environment's image during your deployments; therefore, you should ensure that you have installed [Docker](https://docs.docker.com/get-docker/) on your local machine. Vapor's base Docker images are:

- `laravelphp/vapor:php74`
- `laravelphp/vapor:php80`

Of course, you are free to modify your environment's `Dockerfile` to install additional dependencies or PHP extensions. Here are a few examples:

```docker
FROM laravelphp/vapor:php80

# Add the `ffmpeg` library...
RUN apk --update add ffmpeg

# Add the `mysql` client...
RUN apk --update add mysql-client

# Add the `gmp` PHP extension...
RUN apk --update add gmp gmp-dev
RUN docker-php-ext-install gmp

# Update the `php.ini` file...
# Requires a `php.ini` file at the root of your project...
COPY ./php.ini /usr/local/etc/php/conf.d/overrides.ini

# Place application in Lambda application directory...
COPY . /var/task
```

## Gateway Versions

By default, Vapor routes HTTP traffic to your serverless applications using AWS API Gateway v1 (REST APIs). Your application may run on either API Gateway v1 (REST APIs) or API Gateway v2 (HTTP APIs). By default, applications deploy using API Gateway v1 as it provides a fuller feature set such as Vapor's managed Firewall, and more.

However, API Gateway v2 offers a cost reduction per million requests to your application ($1.00 per million vs. $3.50 per million). If you would like to use API Gateway v2, you may specify the `gateway-version` configuration option for a given environment in your `vapor.yml` file:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        gateway-version: 2
        build:
            - 'composer install --no-dev'
```

### HTTP to HTTPS Redirection With API Gateway v2

If you choose to use API Gateway v2 and would like to support HTTP to HTTPS redirection, we currently suggest using [Cloudflare](https://cloudflare.com) as an external DNS provider for your Vapor application. Cloudflare not only provides DNS, but serves as a reverse proxy to your application and features an option for automatic HTTP to HTTPS redirection.

After a Vapor deployment is completed, Vapor will provide you with CNAME records for the domain(s) associated with your environment. These records will point the domain to your Lambda application. You should manually add these values as CNAME records within the Cloudflare DNS dashboard.

In addition, when using Cloudflare, you should set your Cloudflare SSL / TLS mode to "Full". The "Always Use HTTPS" configuration option may be found under the SSL / TLS menu's "Edge Certificates" tab.

## Custom VPCs

If you want to place your Lambda functions within a VPC that is not managed by Vapor, you may specify the `subnets` and `security-groups` configuration options for a given environment in your `vapor.yml` file:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        subnets:
            - subnet-08aczain4man8bba7
            - subnet-08acr4nd0mbba7
        security-groups:
            - sg-0cr4and0m45b7e0
```

## Deleting Environments

Environments may be deleted via the Vapor UI or using the `env:delete` CLI command:

```bash
vapor env:delete testing
```
