# Logs

[[toc]]

## Introduction

As you may know, Laravel provides support for a variety of logging services. By default, when using Vapor, your application will use the AWS CloudWatch service when logging messages.

## Viewing Logs

The Vapor dashboard provides the most convenient way to view and search your application's logs. By utilizing Vapor's powerful search and filter tools, you can easily access and analyze all of your application's logs that are stored on AWS CloudWatch. 

Vapor allows you to search for specific logs or exceptions, and apply filters based on function type, log level, and the log's time period. Once you locate the relevant log entry, you can click it to view additional information associated with the entry, such as its context or exception details.

Alternatively, you may view logs directly in AWS CloudWatch. To do so, navigate to the AWS console's "Lambda" dashboard. Then, locate the Lambda for your project (vapor-{projectName}-{environmentName}). Then, you may click the "View logs in CloudWatch" link within the Lambda's "Monitoring" tab.

:::tip Infrastructure Logs

Remember, even if you configure a different logging service for your application logs, the AWS CloudWatch service and Vapor UI will display your infrastructure logs as well. Infrastructure logs may include logs regarding AWS Lambda timeouts, etc.
:::
