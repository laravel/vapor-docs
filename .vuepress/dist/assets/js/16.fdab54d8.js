(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{173:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"storage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#storage","aria-hidden":"true"}},[t._v("#")]),t._v(" Storage")]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#introduction"}},[t._v("Introduction")])]),s("li",[s("a",{attrs:{href:"#attaching-storage"}},[t._v("Attaching Storage")])]),s("li",[s("a",{attrs:{href:"#file-uploads"}},[t._v("File Uploads")]),s("ul",[s("li",[s("a",{attrs:{href:"#installing-the-vapor-npm-package"}},[t._v("Installing The Vapor NPM Package")])]),s("li",[s("a",{attrs:{href:"#authorization"}},[t._v("Authorization")])]),s("li",[s("a",{attrs:{href:"#streaming-files-to-s3"}},[t._v("Streaming Files To S3")])]),s("li",[s("a",{attrs:{href:"#acknowledge-file-uploads-permanent-storage"}},[t._v("Acknowledge File Uploads & Permanent Storage")])])])])])]),s("p"),t._v(" "),s("h2",{attrs:{id:"introduction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#introduction","aria-hidden":"true"}},[t._v("#")]),t._v(" Introduction")]),t._v(" "),s("p",[t._v('When running an application in a serverless environment, you may not store files permanently on the local filesystem, since you can never be sure that the same serverless "container" will be used on a subsequent request. All files should be stored in a cloud storage system, such as AWS S3.')]),t._v(" "),s("h2",{attrs:{id:"attaching-storage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#attaching-storage","aria-hidden":"true"}},[t._v("#")]),t._v(" Attaching Storage")]),t._v(" "),s("p",[t._v("To ensure that an application environment has a place to store file uploads, you may add a "),s("code",[t._v("storage")]),t._v(" key to the environment's "),s("code",[t._v("vapor.yml")]),t._v(" configuration. This value should be a valid S3 bucket name. During deployment, Vapor will ensure that this bucket exists. If the bucket does not exist, Vapor will create and configure it. Remember, bucket names must be unique across all of AWS:")]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{attrs:{class:"token key atrule"}},[t._v("id")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("3")]),t._v("\n"),s("span",{attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" vapor"),s("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("app\n"),s("span",{attrs:{class:"token key atrule"}},[t._v("environments")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{attrs:{class:"token key atrule"}},[t._v("production")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{attrs:{class:"token key atrule"}},[t._v("storage")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" my"),s("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("bucket"),s("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v("name\n        "),s("span",{attrs:{class:"token key atrule"}},[t._v("memory")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("1024")]),t._v("\n        "),s("span",{attrs:{class:"token key atrule"}},[t._v("build")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v("'composer install --no-dev'")]),t._v("\n        "),s("span",{attrs:{class:"token key atrule"}},[t._v("deploy")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v("'php artisan migrate --force'")]),t._v("\n")])])]),s("h2",{attrs:{id:"file-uploads"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#file-uploads","aria-hidden":"true"}},[t._v("#")]),t._v(" File Uploads")]),t._v(" "),s("h3",{attrs:{id:"installing-the-vapor-npm-package"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installing-the-vapor-npm-package","aria-hidden":"true"}},[t._v("#")]),t._v(" Installing The Vapor NPM Package")]),t._v(" "),s("p",[t._v("If your application accepts file uploads from end-users, these files should be streamed directly to S3 from your application's frontend. To assist you, Vapor's NPM package includes a "),s("code",[t._v("Vapor.store")]),t._v(" helper which will take care of generating a pre-signed storage URL for the file and uploading the file to S3. To get started, install the "),s("code",[t._v("laravel-vapor")]),t._v(" NPM package:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("install")]),t._v(" --save-dev laravel-vapor\n")])])]),s("p",[t._v("Next, within your application's "),s("code",[t._v("app.js")]),t._v(" file, initialize the global Vapor JavaScript object:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("window"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Vapor "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("require")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v("'laravel-vapor'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"authorization"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#authorization","aria-hidden":"true"}},[t._v("#")]),t._v(" Authorization")]),t._v(" "),s("p",[t._v("Before initiating an upload directly to S3, Vapor's internal signed storage URL generator will perform an authorization check against the currently authenticated user. If you do not already have one, you should create a "),s("code",[t._v("UserPolicy")]),t._v(" for your application using the following command:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("php artisan make:policy UserPolicy --model"),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("User\n")])])]),s("p",[t._v("Next, you should add an "),s("code",[t._v("uploadFiles")]),t._v(" method to this policy. This method should return "),s("code",[t._v("true")]),t._v(" if the given authenticated user is allowed to upload files. Otherwise, you should return "),s("code",[t._v("false")]),t._v(":")]),t._v(" "),s("div",{staticClass:"language-php extra-class"},[s("pre",{pre:!0,attrs:{class:"language-php"}},[s("code",[s("span",{attrs:{class:"token comment"}},[t._v("/**\n * Determine whether the user can upload files.\n *\n * @param  \\App\\User  $user\n * @return mixed\n */")]),t._v("\n"),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("uploadFiles")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("User "),s("span",{attrs:{class:"token variable"}},[t._v("$user")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{attrs:{class:"token boolean"}},[t._v("true")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"streaming-files-to-s3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#streaming-files-to-s3","aria-hidden":"true"}},[t._v("#")]),t._v(" Streaming Files To S3")]),t._v(" "),s("p",[t._v("You may use the "),s("code",[t._v("Vapor.store")]),t._v(" method within your frontend code to upload a file directly to the S3 bucket attached to your environment. The following example demonstrates this functionality using Vue:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("input type"),s("span",{attrs:{class:"token operator"}},[t._v("=")]),s("span",{attrs:{class:"token string"}},[t._v('"file"')]),t._v(" id"),s("span",{attrs:{class:"token operator"}},[t._v("=")]),s("span",{attrs:{class:"token string"}},[t._v('"file"')]),t._v(" ref"),s("span",{attrs:{class:"token operator"}},[t._v("=")]),s("span",{attrs:{class:"token string"}},[t._v('"file"')]),s("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\nVapor"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("store")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token keyword"}},[t._v("this")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("file"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("files"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{attrs:{class:"token number"}},[t._v("0")]),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    progress"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" progress "),s("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{attrs:{class:"token keyword"}},[t._v("this")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("uploadProgress "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" Math"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("round")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("progress "),s("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("100")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("then")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("response "),s("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    axios"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("post")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v("'/api/profile-photo'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        uuid"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" response"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("uuid"),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        key"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" response"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("key"),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        bucket"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" response"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("bucket"),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        name"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("this")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("file"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("files"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{attrs:{class:"token number"}},[t._v("0")]),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        content_type"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("this")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("file"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("files"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{attrs:{class:"token number"}},[t._v("0")]),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("type"),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("All uploaded files will be placed in a "),s("code",[t._v("tmp")]),t._v(" directory within the bucket. "),s("strong",[t._v("This directory is automatically configured to purge any files older than 24 hours.")]),t._v(" This feature serves to conveniently clean up file uploads that are initiated but not completed, such as a user that begins updating their profile photo but does not save the change.")]),t._v(" "),s("h3",{attrs:{id:"acknowledge-file-uploads-permanent-storage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#acknowledge-file-uploads-permanent-storage","aria-hidden":"true"}},[t._v("#")]),t._v(" Acknowledge File Uploads & Permanent Storage")]),t._v(" "),s("p",[t._v("All uploaded files will be stored using a UUID as their filename. The "),s("code",[t._v("response")]),t._v(" provided to the "),s("code",[t._v("store")]),t._v(" method's "),s("code",[t._v("then")]),t._v(" callback will contain the UUID of the file, the file's full S3 key, and the file's bucket. You may then POST this information to your application's backend to permanently store the file by moving it out of the bucket's "),s("code",[t._v("tmp")]),t._v(" directory. In addition, you may wish to store additional information about the file, such as its original name and content type, in your application's database:")]),t._v(" "),s("div",{staticClass:"language-php extra-class"},[s("pre",{pre:!0,attrs:{class:"language-php"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("use")]),t._v(" "),s("span",{attrs:{class:"token package"}},[t._v("Illuminate"),s("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Support"),s("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Facades"),s("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Storage")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nStorage"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{attrs:{class:"token function"}},[t._v("copy")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),s("span",{attrs:{class:"token variable"}},[t._v("$request")]),s("span",{attrs:{class:"token operator"}},[t._v("-")]),s("span",{attrs:{class:"token operator"}},[t._v(">")]),s("span",{attrs:{class:"token function"}},[t._v("input")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token single-quoted-string string"}},[t._v("'key'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{attrs:{class:"token function"}},[t._v("str_replace")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token single-quoted-string string"}},[t._v("'tmp/'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{attrs:{class:"token single-quoted-string string"}},[t._v("''")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{attrs:{class:"token variable"}},[t._v("$request")]),s("span",{attrs:{class:"token operator"}},[t._v("-")]),s("span",{attrs:{class:"token operator"}},[t._v(">")]),s("span",{attrs:{class:"token function"}},[t._v("input")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token single-quoted-string string"}},[t._v("'key'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("div",{staticClass:"tip custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("Local Development")]),t._v(" "),s("p",[t._v("When developing locally, "),s("code",[t._v("Vapor.store")]),t._v(" will upload to the bucket specified by the "),s("code",[t._v("AWS_BUCKET")]),t._v(" environment variable.")])])])}],!1,null,null,null);e.options.__file="storage.md";a.default=e.exports}}]);