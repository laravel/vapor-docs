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
