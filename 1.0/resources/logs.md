# Logs

[[toc]]

## Introduction

As you may know, Laravel provides support for a variety of logging services. By default, when using Vapor, your application will use the AWS CloudWatch service when logging messages.

## Viewing Logs

If you have installed the [Vapor UI dashboard package](./../introduction.html#installing-the-vapor-ui-dashboard), you may access the `/vapor-ui` URI to view and search your application's logs stored in AWS CloudWatch.

Alternatively, you may view logs directly in AWS CloudWatch. To do so, navigate to the AWS console's "Lambda" dashboard. Then, locate the Lambda for your project (vapor-{projectName}-{environmentName}). Then, you may click the "View logs in CloudWatch" link within the Lambda's "Monitoring" tab.

:::tip Infrastructure Logs

Remember, even if you configure a different logging service for your application logs, the AWS CloudWatch service and Vapor UI will display your infrastructure logs as well. Infrastructure logs may include logs regarding AWS Lambda timeouts, etc.
:::
