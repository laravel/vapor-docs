# Storage

[[toc]]

## Introduction

When running an application in a serverless environment, you may not store files permanently on the local filesystem, since you can never be sure that the same serverless "container" will be used on a subsequent request. All files should be stored in a cloud storage system, such as AWS S3.

## Attaching Storage

To ensure that an application environment has a place to store file uploads, you may add a `storage` key to the environment's `vapor.yml` configuration. This value should be a valid S3 bucket name. During deployment, Vapor will ensure that this bucket exists. If the bucket does not exist, Vapor will create and configure it. Remember, bucket names must be unique across all of AWS:

```yaml
id: 3
name: vapor-app
environments:
    production:
        storage: my-bucket-name
        memory: 1024
        build:
            - 'composer install --no-dev'
        deploy:
            - 'php artisan migrate --force'
```

## File Uploads

### Installing The Vapor NPM Package

If your application accepts file uploads from end-users, these files should be streamed directly to S3 from your application's frontend. To assist you, Vapor's NPM package includes a `Vapor.store` helper which will take care of generating a pre-signed storage URL for the file and uploading the file to S3. To get started, install the `laravel-vapor` NPM package:

```bash
npm install --save-dev laravel-vapor
```

Next, within your application's `app.js` file, initialize the global Vapor JavaScript object:

```js
window.Vapor = require('laravel-vapor');
```

### Authorization

Before initiating an upload directly to S3, Vapor's internal signed storage URL generator will perform an authorization check against the currently authenticated user. If you do not already have one, you should create a `UserPolicy` for your application using the following command:

```bash
php artisan make:policy UserPolicy --model=User
```

Next, you should add an `uploadFiles` method to this policy. This method should return `true` if the given authenticated user is allowed to upload files. Otherwise, you should return `false`:

```php
/**
 * Determine whether the user can upload files.
 *
 * @param  \App\User  $user
 * @return mixed
 */
public function uploadFiles(User $user)
{
    return true;
}
```

### Streaming Files To S3

You may use the `Vapor.store` method within your frontend code to upload a file directly to the S3 bucket attached to your environment. The following example demonstrates this functionality using Vue:

```js
<input type="file" id="file" ref="file">

Vapor.store(this.$refs.file.files[0], {
    progress: progress => {
        this.uploadProgress = Math.round(progress * 100);
    }
}).then(response => {
    axios.post('/api/profile-photo', {
        uuid: response.uuid,
        key: response.key,
        bucket: response.bucket,
        name: this.$refs.file.files[0].name,
        content_type: this.$refs.file.files[0].type,
    })
});
````

All uploaded files will be placed in a `tmp` directory within the bucket. **This directory is automatically configured to purge any files older than 24 hours.** This feature serves to conveniently clean up file uploads that are initiated but not completed, such as a user that begins updating their profile photo but does not save the change.

### Acknowledge File Uploads & Permanent Storage

All uploaded files will be stored using a UUID as their filename. The `response` provided to the `store` method's `then` callback will contain the UUID of the file, the file's full S3 key, and the file's bucket. You may then POST this information to your application's backend to permanently store the file by moving it out of the bucket's `tmp` directory. In addition, you may wish to store additional information about the file, such as its original name and content type, in your application's database:

```php
use Illuminate\Support\Facades\Storage;

Storage::copy(
    $request->input('key'),
    str_replace('tmp/', '', $request->input('key'))
);
```

:::tip Local Development

When developing locally, `Vapor.store` will upload to the bucket specified by the `AWS_BUCKET` environment variable.
:::
