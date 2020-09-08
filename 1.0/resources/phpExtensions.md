# PHP Extensions

[[toc]]

## Introduction

When your application requires additional php extensions, which are not part of the [Server requirements](https://laravel.com/docs/#server-requirements) by laravel, you are required to add them to your build layers in vapor. Please refer to [brefphp/extra-php-extensions](https://github.com/brefphp/extra-php-extensions) for a list of [available layers](https://github.com/brefphp/extra-php-extensions#available-layers).

## Adding Extensions

To add an extension to your project, you need to create a `php.ini` file in the root directory which lists the additional extensions to load. Lets use `Imagick` as an example:

```sh
extension=/opt/bref-extra/imagick.so
```

Additionally to the `php.ini` file, you also need to register a new layer in your `vapor.yml` file. Please note that AWS Lambda has a limit of 5 layers, if you require more than that, you'll need to compose your own layer as described [here](https://github.com/brefphp/extra-php-extensions#creating-a-new-layer).

```yaml
environments:
    staging:
        layers:
          - vapor:php-7.4
          - vapor:php-7.4:imagick
```

Once added, redeploy your application in order to utilize the new added extension.