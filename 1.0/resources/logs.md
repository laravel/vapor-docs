# Logs

[[toc]]

## Introduction

As you may know, Laravel provides support for a variety of logging services. By default, when using Vapor, your application will use the AWS CloudWatch service when logging messages.

## Viewing Logs

The Vapor dashboard provides the most convenient way to interact with your logs. By utilizing its powerful search and filter tools, you can easily access and analyze the logs stored on AWS CloudWatch, making it a great place to start debugging your application.

You can search for specific logs or exceptions and apply filters based on function type, log level, and time period to narrow down the log entries you need to focus on. Once you locate the relevant log, you can click through to view all the pertinent information, such as log context or exception details.

Alternatively, you may view logs directly in AWS CloudWatch. To do so, navigate to the AWS console's "Lambda" dashboard. Then, locate the Lambda for your project (vapor-{projectName}-{environmentName}). Then, you may click the "View logs in CloudWatch" link within the Lambda's "Monitoring" tab.

:::tip Infrastructure Logs

Remember, even if you configure a different logging service for your application logs, the AWS CloudWatch service and Vapor UI will display your infrastructure logs as well. Infrastructure logs may include logs regarding AWS Lambda timeouts, etc.
:::
