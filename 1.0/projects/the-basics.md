# The Basics

[[toc]]

## Creating Projects

Vapor projects are created via the Vapor UI or the `vapor init` CLI command. This command should be executed within the root directory of the Laravel project you wish to deploy. The `init` command will prompt you to select the AWS account that the project should be associated with, as well as the AWS region that it should be deployed to.

The `init` command will generate a `vapor.yml` file within the root of your project. This is the primary configuration file for your Vapor project and contains things like build steps, deployment hooks, linked databases / caches, and other project settings. Each time you deploy, Vapor reads this configuration file and deploys your project appropriately.

:::tip Project Networks

When creating a project in a region that you have not created previous projects in, Vapor will automatically begin building a "network" (AWS VPC) in that region. This network may take several minutes to finish provisioning. You can review its status in the "Networks" tab of the Vapor UI.
:::

### Projects & Teams

Before creating a project via the Vapor CLI, ensure your current team is the team you intend to create the project for. You may view your current team using the `team:current` command. You may switch your active team using the `team:switch` command.

```bash
vapor team:switch
```

## Project Settings

### GitHub Repository

Within Vapor's "Project Settings" screen, you may provide the GitHub repository information for a project. Providing this information simply allows Vapor to provide links to GitHub for each deployment's commit hash. You are not required to provide repository information for Vapor to function.

## Managing Vendors

AWS Lambda has strict limitations on the size of applications running within the environment. Typically, the size of your application should not be a problem. However, if you have a large `vendor` directory, you may receive an error indicating that your project is too large.

In order to mitigate this, Vapor offers a `separate-vendor` deployment option which will upload and store your vendor directory separately from the rest of your application. When fresh application containers are booting, your `vendor` directory will be downloaded and unzipped so that your application can access it. This process only takes 1-2 milliseconds. In addition, this option will dramatically reduce the size of your deployment artifact.

To enable this feature, add the `separate-vendor` directive to the project level of your `Vapor.yml` file:

```yaml
id: 3
name: vapor-app
separate-vendor: true
```

## Deleting Projects

You may delete a project using the Vapor UI or the `project:delete` CLI command. The `project:delete` command should be run from the root directory of your project.
