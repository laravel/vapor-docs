# Deployments

[[toc]]

## Introduction

Of course, one of the primary features of Laravel Vapor is atomic, zero-downtime deployments. Unlike many other features of Vapor, deployments are **only initiated via the Vapor CLI**. During deployment, Vapor will run the `build` steps of your `vapor.yml` file on the local machine that the deployment is running on. This might be your personal machine or a continuous integration platform.

## Initiating Deployments

To initiate a deployment, execute the `deploy` CLI command from the root of your application:

```bash
vapor deploy production
```

:::warning Application Size

AWS Lambda has strict limitations on the size of applications running within the environment. If your application exceeds this limit, you may take advantage of Vapor's [Docker based deployments](https://docs.vapor.build/1.0/projects/environments.html#building-custom-docker-images). Docker based deployments allow you to package and deploy applications up to 10GB in size.
:::

## Build Hooks

You may define build hooks for an environment using the `build` key within your `vapor.yml` file. These commands are executed on the local machine that the deployment is running on and may be used to prepare your application for deployment. During deployment, your application is built within a temporary `.vapor` directory that is created by the CLI and all of your `build` commands will run within that temporary directory:

```yaml
id: 3
name: vapor-app
environments:
    production:
        memory: 1024
        database: vapor-app
        cache: vapor-cache
        build:
            - 'composer install --no-dev'
            - 'php artisan event:cache'
        deploy:
            - 'php artisan migrate --force'
```

## Deploy Hooks

You may define deployment hooks for an environment using the `deploy` key within your `vapor.yml` file. These commands are executed against the deployed environment **before it is activated for general availability**. If any of these commands fail, the deployment will not be activated.

```yaml
id: 3
name: vapor-app
environments:
    production:
        memory: 1024
        database: vapor-app
        cache: vapor-cache
        build:
            - 'composer install --no-dev'
            - 'php artisan event:cache'
        deploy:
            - 'php artisan migrate --force'
```

### Reviewing Output / Logs

When a deployment hook fails, you may review the output / logs via the Vapor UI's deployment detail screen.

Also, if you are deploying your application using the `vapor deploy` command, the CLI output will contain the failing hook output. Of course, you may review the output at any time using the `hook:output` command:

```bash
vapor hook:output {DEPLOYMENT_HOOK_ID}
```

You can review the logs associated with the failing hook using the `hook:log` command:

```bash
vapor hook:log {DEPLOYMENT_HOOK_ID}
```

## Assets

During deployment, Vapor will automatically extract all of the assets in your Laravel project's `public` directory and upload them to S3. In addition, Vapor will create a AWS CloudFront (CDN) distribution to distribute these assets efficiently around the world.

Because all of your assets will be served via S3 / CloudFront, you should always generate URLs to these assets using Laravel's `asset` helper. Vapor injects an `ASSET_URL` environment variable which Laravel's `asset` helper will use when constructing your URLs:

```php
<img src="{{ asset('img.jpg') }}">
```

On subsequent deployments, only the assets that have changed will be uploaded to S3, while unchanged assets will be copied over from the previous deployment.

### Code Splitting / Dynamic Imports

If you are taking advantage of dynamic imports and code splitting in your project, you will need to let Webpack know where the child chunks will be loaded from for each deployment. To accomplish this, you can take advantage of the `ASSET_URL` variable that Laravel Vapor injects into your environment during your build step:

```javascript
const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js("resources/js/app.js", "public/js")
  .sass("resources/sass/app.scss", "public/css");

if (mix.inProduction()) {
    const ASSET_URL = process.env.ASSET_URL + "/";

    mix.webpackConfig(webpack => {
        return {
            plugins: [
                new webpack.DefinePlugin({
                    "process.env.ASSET_PATH": JSON.stringify(ASSET_URL)
                })
            ],
            output: {
                publicPath: ASSET_URL
            }
        };
    });
}
```

#### Hot Module Replacement

If you are using code splitting and "hot module replacement" during local development, you will need to use the `mix` helper locally and the `asset` helper when deploying to Vapor:

```php
@if (app()->environment('local'))
    <link href="{{ mix('css/admin/app.css') }}" rel="stylesheet">
    <script src="{{ mix('js/admin/app.js') }}"></script>
@else
    <link href="{{ asset('css/admin/app.css') }}" rel="stylesheet">
    <script src="{{ asset('js/admin/app.js') }}" defer></script>
@endif
```

### URLs Within CSS

Sometimes, your CSS may need to reference asset URLs, such as a `background-image` property that references an image via URL. Obviously, you are not able to use the PHP `asset` helper within your CSS. For this reason, Vapor will automatically prepend the correct asset base URL to all relative URLs in your CSS during the build process. After your build steps have executed, Vapor performs this action against any CSS files in your application's `public` directory (including directories nested under `public`).

### Root Domain Assets

Some applications, such as PWAs, may need to serve certain assets from the root domain. If your application has this need, you can define an array of assets that should be served from your application's root domain via the `serve_assets` configuration option within your `vapor` configuration file:

```php
/*
|--------------------------------------------------------------------------
| Servable Assets
|--------------------------------------------------------------------------
|
| Here you can configure list of public assets that should be servable
| from your application's domain instead of only being servable via
| the public S3 "asset" bucket or the AWS CloudFront CDN network.
|
*/

'serve_assets' => [
    'serviceWorker.js',
],
```

If your application doesn't contain a `vapor` configuration file, you can publish it using the `vendor:publish` Artisan command:

```
php artisan vendor:publish --tag=vapor-config
```

:::warning Performance Penalty

Due to the serverless nature of applications powered by Vapor, assets served from the root domain are not cacheable at the client-side and they are served using Laravel routes. Therefore, you should only serve assets that absolutely must be served from the root domain as there is a slight performance penalty for doing so.
:::

### Dot Files As Assets

Typically, "dot" files are not uploaded to the AWS CloudFront CDN by Vapor. However, if you need the public directory's dot files to be uploaded as assets, you should set the `dot-files-as-assets` key to `true` in your `vapor.yml` file:

```yml
id: 1
name: app-test
dot-files-as-assets: true
```

You may also choose to serve asset dot files from the application's root domain:

```php
'serve_assets' => [
    'serviceWorker.js',
    '.well-known/assetlinks.json',
],
```

## Redeploying

Sometimes you may need to simply redeploy a given environment without rebuilding it. For example, you may wish to do this after updating an environment variable. To accomplish this, you may use the Vapor UI or the `redeploy` CLI command:

```bash
vapor redeploy production
```

## Rollbacks

To rollback to a previous deployment, you may select the deployment in the Vapor UI and click the "Rollback To" button, or you may use the `rollback` CLI command. The `rollback` command's "--select" option will allow you to select which deployment to rollback to from a list of recent deployments. If the `rollback` command is executed without this option, it will simply rollback to the most previous successful deployment:

```bash
vapor rollback production

vapor rollback production --select
```

:::warning Variables, Secrets, & Rollbacks

When rolling back to a previous deployment, Vapor will use the environment's variables and secrets as they existed at the time the deployment you're rolling back to was originally deployed.
:::

## Deploying From CI

So far, we have discussed deploying Vapor projects from your local command line. However, you may also deploy them from a CI platform of your choice. Since the Vapor CLI client is part of your Composer dependencies, you may simply execute the `vapor deploy` command in your CI platform's deployment pipeline.

In order to authenticate with Vapor from your CI platform, you will need to add a `VAPOR_API_TOKEN` environment variable to your CI build environment. You may generate an API token in your [Vapor API settings dashboard](https://vapor.laravel.com/app/account/api-tokens).

### Git Commit Information

Some CI platforms expose the Git commit information as environment variables during your build. You may pass this information to the `vapor deploy` command. For example, if using CodeShip:

```sh
vapor deploy production --commit="${CI_COMMIT_ID}" --message="${CI_MESSAGE}"
```

### Example with GitHub Actions

If [GitHub Actions](https://github.com/features/actions) is your CI platform of choice, you may follow these steps so you can have a basic deployment pipeline using GitHub Actions that deploys your application when someone pushes to `master`:

1. First, and as mentioned before, add the `VAPOR_API_TOKEN` environment variable to your "GitHub > Project Settings > Secrets" so GitHub can authenticate with Vapor while running actions.

2. Next, create a file on the directory `your-project/.github/workflows` with the name `deploy.yml` and the following contents:

```yml
name: Deploy

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: 8.0
          tools: composer:v2
          coverage: none
      - name: Require Vapor CLI
        run: composer global require laravel/vapor-cli
      - name: Deploy Environment
        run: vapor deploy
        env:
          VAPOR_API_TOKEN: ${{ secrets.VAPOR_API_TOKEN }}
```

3. Finally, commit & push the `deploy.yml` file.

Feel free to tweak the `deploy.yml` file to fit your own needs. As an example, your deployment depends on `npm`, you will need an extra step to install `npm`.
