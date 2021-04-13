# Development

[[toc]]

## Binary Responses

To return binary responses, such as PDF downloads, from your Vapor application, your HTTP response should include the `X-Vapor-Base64-Encode` header:

```php
return $response->withHeaders([
    'X-Vapor-Base64-Encode' => 'True',
]);
```

:::warning Lambda Response Size

Lambda limits responses to 6MB. If you need to serve a larger file, consider returning a signed, temporary S3 URL that your user may use to download the file directly from S3.
:::

## Access The Lambda Event Object

When an AWS Lambda function is invoked (whether HTTP, CLI, or Queue), an "event" object is received from AWS. The event differs in structure and contents based on the service that invoked the Lambda function. For example, an event created by API Gateway will contain details related to the HTTP request.

To obtain an instance of the current Lambda event via dependency injection, you may type-hint the `Laravel\Vapor\Runtime\LambdaEvent` class on your route closure, controller, job, or command:

```php
use Laravel\Vapor\Runtime\LambdaEvent;

Route::get('/', function (LambdaEvent $event) {
    $context = $event['requestContext'];

    $domain = $context['domainName'];

    // ..
});
```
## Configuring OpenSSL

To use certain OpenSSL functions, such as [openssl_pkey_new](https://www.php.net/manual/en/function.openssl-pkey-new.php), you'll need to provide an openssl.cnf file. Because Vapor injects environment variables into the underlying lambda container instead of loading them at runtime, the path to the file can be provided in your `.env` file

```
OPENSSL_CONF="/var/task/openssl.cnf"
```

:::warning Local functionality

Because environment variables locally get loaded at a later stage, this will not override the config on a local environment.
:::
