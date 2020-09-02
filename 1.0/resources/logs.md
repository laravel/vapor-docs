# Logs

[[toc]]

## Introduction

As you may know, Laravel provides support for a variety of logging services. By default, when using Vapor, your application will use the AWS CloudWatch service when logging messages.

## Visualizing Logs

If you have installed the [Vapor UI dashboard package](#installing-the-vapor-ui), you may access the `/vapor-ui` URI to view and search your application's logs stored in AWS CloudWatch.

:::tip Infrastructure Logs

Remember, even if you configure a different logging service for your application logs, the AWS CloudWatch service and Vapor UI will display your infrastructure logs as well. Infrastructure logs may include logs regarding AWS Lambda timeouts, etc.
:::

### Local Environment

If you would like to use the Vapor UI dashboard in your local environment to view your production application's logs, you must set the following environment variables:

```
AWS_ACCESS_KEY_ID=
AWS_DEFAULT_REGION=
AWS_SECRET_ACCESS_KEY=
VAPOR_ENVIRONMENT=
VAPOR_PROJECT=
```
