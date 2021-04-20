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

## Configuring OpenSSL

To use certain OpenSSL functions such as [openssl_pkey_new](https://www.php.net/manual/en/function.openssl-pkey-new.php), you must create an `openssl.cnf` configuration file and instruct Vapor to load it via the `OPENSSL_CONF` environment variable. For example, this environment variable will instruct Vapor to load an `openssl.cnf` file from the root of your project:

```
OPENSSL_CONF="/var/task/openssl.cnf"
```

An example `openssl.cnf` file is available below:

```
dir = certificates

[ ca ]
default_ca = CA_default

[ CA_default ]
serial = $dir/serial
database = $dir/index.txt
new_certs_dir = $dir/newcerts
certificate  = $dir/cacert.pem
private_key = $dir/private/cakey.pem
default_days = 36500
default_md  = sha256
preserve = no
email_in_dn  = no
nameopt = default_ca
certopt = default_ca
policy = policy_match

[ policy_match ]
commonName = supplied
countryName = optional
stateOrProvinceName = optional
organizationName = optional
organizationalUnitName = optional
emailAddress = optional

[ req ]
default_bits = 2048
default_keyfile = priv.pem
default_md = sha256
distinguished_name = req_distinguished_name
req_extensions = v3_req
encyrpt_key = no

[ req_distinguished_name ]

[ v3_ca ]
basicConstraints = CA:TRUE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer:always

[ v3_req ]
basicConstraints = CA:FALSE
subjectKeyIdentifier = hash
```
