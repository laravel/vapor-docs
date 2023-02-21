# Troubleshooting

[[toc]]

## Performance Issues

While you can achieve blazing-fast load times in your Laravel applications powered by Vapor, you may face performance issues if you misconfigure your infrastructure.

In this section, we'll cover the Vapor **most common infrastructure performance tips** that may speed your Laravel applications powered by Vapor. Before we dive in, please keep in mind:

1. **Optimize your application first**: by making your application faster you may not require any infrastructure changes at all. Identify application performance bottlenecks and try to solve them using simple techniques such as caching, queuing, or database query optimizations.

2. **Infrastructure changes may have an impact on your AWS bill**: Of course, allocating more (or different) resources for your Vapor environment may cause your AWS bill to increase. Therefore, you may need to study how the pricing of that changes will affect your AWS bill: **[aws.amazon.com/pricing](https://aws.amazon.com/pricing/)**.

#### Increasing the `memory` option

Vapor - via AWS Lambda - allocates CPU power to your Lambda function in proportion to the amount of memory configured for the environment. Therefore, increasing the memory may lead to better performance as the Lambda function will have more CPU power to process your requests and queued jobs.

You may increase the configured memory for the HTTP Lambda function, Queue Lambda function, or CLI Lambda function using the [`memory`](https://docs.vapor.build/1.0/projects/environments.html#memory), [`queue-memory`](https://docs.vapor.build/1.0/resources/queues.html#queue-memory), or `cli-memory` options, respectively, in your environment's `vapor.yml` configuration.

#### Increasing the `warm` option

If you are facing post-deployment performance issues at scale, that may indicate that your environment does not "pre-warm" enough containers in advance. Therefore, some requests incur a penalty of a few seconds while AWS loads a serverless container to process the request.

To mitigate this issue - commonly known as "cold-starts" - Vapor allows you to define a [`warm`](https://docs.vapor.build/1.0/projects/environments.html#prewarming) configuration value for an environment in your `vapor.yml` file. The `warm` value represents how many serverless containers Vapor will "pre-warm" so they can be ready to serve requests.

#### Using "fixed-size" databases

Serverless databases are auto-scaling databases that do not have a fixed amount of RAM or disk space. Yet, the "auto-scaling" mechanism offered by AWS can have cold start times of up to a few seconds every time your environment needs more database resources.

To mitigate this issue, consider using "fixed-size" databases where resources are prepared in advance. You may [create "fixed-size" databases](https://docs.vapor.build/1.0/resources/databases.html#fixed-size-databases) using the Vapor UI or using the `database` CLI command.

#### Using database proxies

Even though your serverless Laravel applications powered by Vapor can handle extreme amounts of web traffic, traditional relational databases such as MySQL can become overwhelmed and crash due to connection limit restrictions.

To mitigate this issue, Vapor allows the usage of an **[RDS proxy](https://aws.amazon.com/rds/proxy/)** to efficiently manage your database connections and allow many more connections than would typically be possible. The database proxy [can be added](https://docs.vapor.build/1.0/resources/databases.html#database-proxies) via the Vapor UI or the `database:proxy` CLI command.

#### Scale existing "fixed-size" resources

If you are facing performance issues at scale, that may indicate that existing resources - such as "fixed-size" databases or "fixed-size" caches - may not be able to keep up with the number of tasks managed by your application.

To mitigate this issue, consider scale existing "fixed-size" resources, if any. For example, you may [scale "fixed-size" databases](https://docs.vapor.build/1.0/resources/databases.html#scaling-databases) via the Vapor UI's database detail screen or the `database:scale` CLI command.

#### Consider Redis over DynamoDB

If your application heavily relies on caching - which is already a great way to massively speed up your application - using a Redis cache instead of DynamoDB can speed up cache IO.

You may [create caches](https://docs.vapor.build/1.0/resources/caches.html#introduction) using the Vapor UI or using the `cache` CLI command.

#### Consider API Gateway v2 instead of API Gateway v1

By migrating from API Gateway v1 to API Gateway v2, you can expect 50% less latency in the requests to your application. However, API Gateway v2 is regional, meaning that customers from a region very distant from your project may be negatively affected by this change. Also, some features, like Vapor's managed Firewall, may not be available.

If you would like to [use API Gateway 2.0](https://docs.vapor.build/1.0/projects/environments.html#gateway-versions), you may specify `gateway-version: 2` in your environment's `vapor.yml` configuration.

#### Contact AWS Support

Laravel Vapor provisions and configures your projects on the AWS infrastructure. However, for performance insights regarding your infrastructure, we recommend you to reach out to [AWS Support](https://console.aws.amazon.com/support/home?#/case/create?issueType=technical) as they can deeply examine the internal logs of your infrastructure.

## 502 Bad Gateway Or "Internal Server Error"

Typically, a 502 Bad Gateway or an "Internal Server Error" is thrown when the Lambda function fails to handle the request internally. Most of the time this is because the request has timed out or because the payload / response is exceeding the size allowed by AWS.

You can see if a request has timed out by searching for "Task timed out" messages in your environment logs. Here are some common solutions to "time out" issues:

1. Change the [`timeout`](https://docs.vapor.build/1.0/projects/environments.html#timeout) value on your `vapor.yml` file and deploy your application again.
2. Try to identify the code that may be causing this "time out" issue. This may be related resources configured incorrectly, or a task may take longer than expected — in this case, please consider using [queues](https://docs.vapor.build/1.0/resources/queues.html) for heavy tasks.
3. Alternatively, you can reach [AWS Support](https://console.aws.amazon.com/support/home?#/case/create?issueType=technical) - as they can deeply examine the internal logs of your infrastructure.

If you don't see any "Task timed out" messages in your environment logs, this indicates the error is likely because the payload / response is exceeding the size allowed by AWS. Please consult AWS's [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html) and [Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-limits.html) quotas.

## Sandbox URL Returns 400 "message: null"

Square brackets used in the query string of a Lambda function URL must be URL encoded. Failure to do so results in a 400 status code error being returned by the application. This is due to an AWS limitation in the mapping between the URL and Lambda functions. It is most common to encounter this issue when attempting to send arrays of data as part of the URL:

```
https://xyz.lambda-url.us-east-1.on.aws?items[]=1 ❌

https://xyz.lambda-url.us-east-1.on.aws?items%5B%5D=1 ✅
```
