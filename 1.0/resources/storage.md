# Storage

[[toc]]

## Introduction

When running an application in a serverless environment, you may not store files permanently on the local filesystem, since you can never be sure that the same serverless "container" will be used on a subsequent request. All files should be stored in a cloud storage system, such as AWS S3, or in a shared file system through AWS EFS.

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

## Mounting A Persistent File System

To mount a file system on your Lambda, you need to [attach your environment to a Vapor network](./networks.md#introduction) and then create a new elastic file system (EFS) using the AWS console. In the EFS dashboard, you should click the "Create file system" button and choose the VPC created by your Vapor network. Once the file system is created, click on its name to access the configuration screen and then click on "Access Points". Create an access point and specify `1001` for the user and group of both the "POSIX user" and "Root directory creation permissions" settings. For the "Root directory path" configuration option, you should assign a unique name such as `/{project_name}_{environment_name}`.

After creating the disk, you should navigate to the AWS Lambda dashboard. Once in the Lambda dashboard, locate each of the three Lambda functions (the primary function, the "cli" function, and the "queue" function) for your project environment and attach the file system you just created. You may attach the file system by viewing the Lambda function's detail page and clicking the "Add file system" button. You should mount the file system to `/mnt/local`.

Once mounted, you can store and retrieve files to the `/mnt/local` disk path. This path will be shared and accessible by all three of the Lambda functions.

## File Uploads

Due to AWS Lambda limitations, file uploads made directly to your application backend can only be up to roughly 4.5MB in size. This is a hard limit imposed by AWS, and updating the `php.ini` configuration file or any other configuration will not raise this limit. Therefore, to ensure your application's users won't receive an `HTTP 413 Payload Too Large` response, you may validate the file upload size using JavaScript before initiating the file upload to your application's backend.

If your application needs to receive file uploads larger than AWS allows, those files must be streamed directly to S3 from your application's frontend (Browser). To assist you, we've written an NPM package that makes it easy to perform file uploads directly from your application's frontend.

### Installing The Vapor NPM Package

To get started, install the `laravel-vapor` NPM package:

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

The `tmp` directory is private by default. To override this for a given file you may add a `visibility` property to the options provided to the `Vapor.store` method. The `visibility` property should be assigned one of [S3's predefined permission grants](https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl):

```js
Vapor.store(this.$refs.file.files[0], {
    visibility: 'public-read'
}).then(response => {
    // ...
});
````

### Acknowledge File Uploads & Permanent Storage

All uploaded files will be stored using a UUID as their filename. The `response` provided to the `store` method's `then` callback will contain the UUID of the file, the file's full S3 key, and the file's bucket. You may then POST this information to your application's backend to permanently store the file by moving it out of the bucket's `tmp` directory. In addition, you may wish to store additional information about the file, such as its original name and content type, in your application's database:

```php
use Illuminate\Support\Facades\Storage;

Storage::copy(
    $request->input('key'),
    str_replace('tmp/', '', $request->input('key'))
);
```

#### Local Development

When developing locally, `Vapor.store` will upload to the bucket specified by the `AWS_BUCKET` environment variable. In addition, your bucket may require CORS configuration to allow uploads from localhost:

```json
[
   {
      "AllowedHeaders":[
         "*"
      ],
      "AllowedMethods":[
         "GET",
         "PUT"
      ],
      "AllowedOrigins":[
         "*"
      ],
      "ExposeHeaders":[]
   }
]
```

## Temporary Storage

Your application may store temporary files within the `/tmp` directory. By default, this directory has a fixed size of 512 MB, and the information on it is preserved for the lifetime of each request, CLI command, or queue job.

You may increase or decrease the configured temporary storage size using the `tmp-storage`, `cli-tmp-storage`, and `queue-tmp-storage` options in your environment's `vapor.yml` configuration. These configuration options accepts values between 512 MB and 10,240 MB:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        tmp-storage: 1024
        cli-tmp-storage: 512
        queue-tmp-storage: 10240
        build:
            - 'composer install --no-dev'
```
