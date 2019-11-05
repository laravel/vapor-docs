# Introduction

[[toc]]

## What Is Vapor?

Laravel Vapor is an auto-scaling, serverless deployment platform for Laravel, powered by AWS Lambda. Manage your Laravel infrastructure on Vapor and fall in love with the scalability and simplicity of serverless.

Vapor abstracts the complexity of managing Laravel applications on AWS Lambda, as well as interfacing those applications with SQS queues, databases, Redis clusters, networks, CloudFront CDN, and more. Some highlights of Vapor's features include:

- Auto-scaling web / queue infrastructure fine tuned for Laravel
- Zero-downtime deployments and rollbacks
- Environment variable / secret management
- Database management, including point-in-time restores and scaling
- Redis Cache management, including cluster scaling
- Database and cache tunnels, allowing for easy local inspection
- Automatic uploading of assets to Cloudfront CDN during deployment
- Unique, Vapor assigned vanity URLs for each environment, allowing immediate inspection
- Custom application domains
- DNS management
- Certificate management and renewal
- Application, database, and cache metrics
- CI friendly

**In short, you can think of Vapor as [Laravel Forge](https://forge.laravel.com) for serverless technology.**

## Requirements

Vapor requires that your application be compatible with PHP 7.3+ and Laravel 6.0+.

## Account Creation

Before integrating Vapor into your application, you should create a Vapor account. If you are just collaborating with others on their projects, you are not required to have a Vapor subscription. To create and manage your own projects, you will need a Vapor subscription.

## Installing The Vapor CLI

You will deploy your Laravel Vapor applications using the [Vapor CLI](https://github.com/laravel/vapor-cli). This CLI may be installed globally or on a per-project basis using Composer:

```bash
composer require laravel/vapor-cli

composer global require laravel/vapor-cli
```

When the CLI is installed per project, you will likely need to execute it via the `vendor/bin` directory of your project, which is where Composer installs executables. For example, to view all of the available Vapor CLI commands, you may use the `list` command:

```bash
php vendor/bin/vapor list
```

:::tip Vapor CLI Alias

To save keystrokes when interacting with per-project installations of the Vapor CLI, you may add a shell alias to your operating system that aliases the `vapor` command to `php vendor/bin/vapor`.
:::

To learn more about a command and its arguments, execute the `help` command with the name of the command you wish to explore:

```bash
php vendor/bin/vapor help deploy
```

### Logging In

After you have installed the Vapor CLI, you should authenticate with your Vapor account using the `login` command:

```bash
vapor login
```

## Installing The Vapor Core

The `laravel/vapor-core` [package](https://github.com/laravel/vapor-core) must be installed as a dependency of every Laravel application that is deployed using Vapor. This package contains various Vapor runtime files and a service provider to allow your application to run on Vapor. You may install the Vapor Core into your project using Composer:

```bash
composer require laravel/vapor-core
```

## Teams

When you create your Vapor account, a "Personal" team is automatically created for you. You can rename this team in your team settings. All projects, databases, caches, and other Vapor resources belong to a team. You are free to create as many teams as you wish via the Vapor UI or the `team` CLI command. There is no additional charge for creating teams, and they serve as a great way to organize your projects by client or topic.

### Current Team & Switching Teams

When managing Vapor resources via the CLI, you will need to be aware of your currently active team. You may view your current team using the `team:current` command:

```bash
vapor team:current
```

To change your active team, you may use the `team:switch` command:

```bash
vapor team:switch
```

### Collaborators

You can invite more people to your team via the "Team Settings" menu in the Vapor UI, or using the `team:add` CLI command. When you add a new collaborator to your team via the Vapor UI, you may select the permissions to assign to that person. For example, you can prevent a given team member from deleting databases or caches.

You may remove collaborators from your team using the Vapor UI or `team:remove` CLI command.

## Linking With AWS

In order to deploy projects or create other resources using Vapor, you will need to link an active AWS account on your team's settings management page.

### Creating An IAM User

To create the AWS access key and secret required by Vapor to manage resources on your AWS account, you will need to create a new IAM user within AWS. To create a new IAM user, navigate to the IAM service on your AWS dashboard. Once you are in the IAM dashboard, you may select "Users" from the left-side navigation panel.

Next, click the "Add user" button and choose a user name. When selecting an "Access type", select "Programmatic access". This instructs AWS IAM to issue a access key ID and secret access key for the IAM user. Then, click "Next".

#### Administrator Access

:::tip IAM Access

Since Vapor manages many types of resources across more than a dozen AWS services, it may be convenient to create a user with the `AdministratorAccess` policy. If desired, you may create a separate AWS account to house this user and contain all of your Vapor resources.
:::

On the permissions management screen, you may grant full administrator access to the IAM user by selecting the "Attach existing policies directly" option and "AdministratorAccess" policy. Once the policy has been attached, you may click "Next".

Once the user is created, AWS will display the access key ID and secret access key for the user. These credentials may then be provided to Vapor so that AWS resources may be managed on your behalf. Your linked AWS accounts may be managed via the "Team Settings" screen of the Vapor UI.

## Notification Methods

### Slack

In order to receive notifications via Slack, you will need to [create a Slack App](https://api.slack.com/apps) and select the workspace to which the Slack App should be installed.

Once the Slack App has been created, visit the **Incoming Webhooks** settings pane of your App under the "Features" sidebar. Then, activate the Incoming Webhooks feature using the activation switch.

Once activated, you can create a new Incoming Webhook using the **Add New Webhook to Workspace** button. Finally, you should copy the webhook URL provided by Slack and insert into Vapor's notification method creation form.
