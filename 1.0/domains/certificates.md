# Certificates

[[toc]]

## Introduction

Vapor provides free, auto-renewing SSL certificates to your application using AWS Certificate Manager. Vapor certificates may be validated using DNS or email. All Vapor applications using custom domains are required to have a valid certificate for that domain.

## Creating Certificates

You may create SSL certificates via the Vapor UI or using the `cert` CLI command. Vapor will automatically generate a wildcard certificate for the domain.

### DNS Validation

You may create a certificate using DNS validation via the Vapor UI or using the `cert` CLI command:

```bash
vapor cert example.com
```

Shortly after the certificate is requested, you may obtain two CNAME records from the certificate detail screen of the Vapor UI. If a [Vapor DNS zone](./dns.md) exists for the domain the certificate belongs to, these CNAME records will automatically be added to the zone. Therefore, if you are using Vapor to manage your DNS, no further action is required and your certificate will be validated and issued within minutes.

If you are not using Vapor to manage your DNS, you should add the two CNAME records to your domain's DNS provider manually.

## Deleting Certificates

You may not delete a certificate that is associated with an active deployment. However, if you would like to delete an old certificate that is not associated with a deployment, you may do so via the Vapor UI or using the `cert:delete` CLI command. After executing the command, Vapor will prompt you for the specific certificate to delete for the given domain:

```bash
vapor cert:delete example.com
```
