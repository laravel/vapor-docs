# Development

[[toc]]

## Binary Responses

To return binary responses, such as PDF downloads, from your Vapor application, your HTTP response should include the `X-Vapor-Base64-Encode` header:

    return $response->withHeaders([
        'X-Vapor-Base64-Encode' => 'True',
    ]);
