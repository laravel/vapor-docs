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

Lambda currently limits responses to 6MB. If you need to return a file larger than this you should return a signed url from S3 instead. :::
