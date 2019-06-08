# Introduction

[[toc]]

## What Is Vapor?

Laravel Vapor is an auto-scaling, serverless deployment platform for Laravel, powered by AWS Lambda. Manage your Laravel infrastructure on Vapor and fall in love with the scalability and simplicity of serverless. Vapor abstracts the complexity of managing Laravel applications on AWS Lambda, as well as interfacing those applications with SQS queues, databases, Redis clusters, networks, CloudFront CDN, and more.

In short, you can think of Vapor as [Laravel Forge](https://forge.laravel.com) for serverless technology.

## Account Creation

Before integrating Vapor into your application, you should create a Vapor account. If you are just collaborating with others on their projects, you are not required to have a Vapor subscription. To create and manage your own projects, you will need a Vapor subscription.

## Installing The Vapor CLI

You will deploy your Laravel Vapor applications using the [Vapor CLI](https://github.com/laravel/vapor-cli). This CLI may be installed globally or on a per-project basis. To install the CLI globally, you should download the latest release of the Vapor CLI "Phar" archive. To install the CLI for a single project, you may use Composer:

```bash
composer require laravel/vapor-cli
```

## Installing The Vapor Core

The `laravel/vapor-core` [package](https://github.com/laravel/vapor-core) must be installed as a dependency of every Laravel application that is deployed using Vapor. This package contains various Vapor runtime files and a service provider to allow your application to run on Vapor. You may install the Vapor Core into your project using Composer:

```bash
composer require laravel/vapor-core
```

## Linking With AWS

The `laravel/vapor-core` [package](https://github.com/laravel/vapor-core) must be installed as a dependency of every Laravel application that is deployed using Vapor. This package contains various Vapor runtime files and a service provider to allow your application to run on Vapor. You may install the Vapor Core into your project using Composer:
