# Logs

[[toc]]

## Introduction

As you may know, Laravel provides support for a variety of logging services. By default, when using Vapor, your application will use the AWS CloudWatch service when logging messages.

## Visualizing Logs

If you have installed the [Vapor UI dashboard package](./../introduction.html#installing-the-vapor-ui-dashboard), you may access the `/vapor-ui` URI to view and search your application's logs stored in AWS CloudWatch.

Alternatively, you may visualize logs directly in AWS CloudWatch at AWS console > Lambda > Locate the lambda for your project (vapor-{projectName}-{environmentName}) > Monitoring > View logs in CloudWatch.

:::tip Infrastructure Logs

Remember, even if you configure a different logging service for your application logs, the AWS CloudWatch service and Vapor UI will display your infrastructure logs as well. Infrastructure logs may include logs regarding AWS Lambda timeouts, etc.
:::
