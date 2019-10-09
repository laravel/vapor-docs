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
