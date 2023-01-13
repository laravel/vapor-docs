# Domains

[[toc]]

## Introduction

With Vapor, each environment is provided with a unique vanity domain that you can use to access the environment after it is deployed. However, it's important to keep in mind that vanity domains are intended for development purposes only and Vapor automatically adds "no-index" headers to the responses to prevent them from being indexed by search engines.

In addition, these vanity domains will continue to function even when an application is in maintenance mode, allowing you to test your environment before disabling maintenance mode and restoring general access.

While vanity domains are useful during the development process, it's not recommended to use them for a production environment or share them with the public. Instead, it's a best practice to use your own custom domain.

## Buying a domain

If you do not own a domain, purchasing one through the Vapor platform is not possible. So, you must obtain the domain through an external provider.

Here are some options you can consider:
- Amazon Route 53
- CloudFlare
- Hover
- Namecheap

## Add a domain

Once you purchase a domain, you may add it to Vapor through the Vapor UI's domain screen or by using the domain CLI command. Note that, even if you plan to use a sub-domain for your environment, you should still use the root domain here to ensure that all the necessary configurations, such as SSL Certificates, are in place:

```bash
vapor domain example.com
```

You may visit the details of your Vapor domains at any time using the Vapor UI's domain screen or using the `domain:list` CLI command:

```bash
vapor domain:list
```

## Managing DNS Records

At some point, you will need to request a certificate for this domain or attaching it with an existing Vapor environment. Both of these actions will require the creation of DNS records. If you choose to have Vapor manage your DNS records, it will automatically handle them for you.

When you add a domain to Vapor, it will provide you with the "nameservers". You can then update the nameservers at your domain registrar (the external provider where you bought the domain) to the ones given to you by Vapor. This will designate Vapor as the entity managing the DNS records for the domain.

**If you prefer to manage your DNS records on your own**, keep in mind that actions such as requesting a certificate or attaching the domain to an environment will require you to **create DNS records manually** through your external provider.

### Custom DNS Records

If you have chosen to use Vapor to handle your DNS records, you can add, update, or remove them as needed. Vapor provides two ways for you to manage your DNS records: through the Vapor UI's domain detail screen or via the Vapor CLI. To create a DNS record using the Vapor CLI, you can use the record command:

```bash
vapor record example.com A www 192.168.1.1

vapor record example.com A @ 192.168.1.1

vapor record example.com CNAME foo another-example.com

vapor record example.com MX foo "10 example.com,20 example2.com"
```

:::tip Record Upserts

The `record` command functions as an "UPSERT" operation. If an existing record exists with the given type and name, its value will be updated to the given value. If no record exists with the given type or name, the record will be created.
:::

To delete a record through the Vapor CLI, you can use the `record:delete` command:

```bash
vapor record:delete example.com A www
```

## Requesting an SSL Certificate

Before associating a domain to an existing Vapor environment, you must have a valid SSL certificate. Vapor offers free, automatically renewing SSL certificates for your Vapor environment through AWS Certificate Manager.

Typically, users choose the "us-east-1" region for their certificate, which is the required certificate region for all environments using API Gateway 1.0. However, environments using API Gateway 2.0 or Load Balancers require a certificate in the same region as the project.

You can create a certificate either through the Vapor UI's domain screen or by using the `cert` CLI command:

```bash
vapor cert example.com
```

At this point, no further action is required and your certificate will be validated and issued within minutes.

:::warning Self-Managed Domains

If you self-manage your domain's DNS records, Vapor will not be able to automatically update them. In this case, you can obtain the domain's certificate CNAME record from the Vapor UI's domain detail screen or by running the vapor `record:list example.com` command. Then, you can update your DNS records at the external provider accordingly.

Please note that some DNS providers will automatically append the domain name to the CNAME name. In these instances, you can remove the domain name from the CNAME name.
:::

You can view the validation status of your certificates on the Vapor UI or by using the `cert:list` CLI command:

```bash
vapor cert:list example.com
```

If you want to delete an old certificate that is not attached to an environment, you can do so through the Vapor UI's domain detail screen or by using the `cert:delete` CLI command. After running the command, Vapor will prompt you to select the specific certificate you want to delete for the given domain:

```bash
vapor cert:delete example.com
```

## Attaching a Domain to an Environment

Once you have a valid certificate, you can attach your domain to your environment by using the "domain" configuration option in your vapor.yml file. When attaching a domain to an environment, you don't need to include the "www" sub-domain:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        domain: example.com
        build:
            - 'composer install --no-dev'
```

During deployment, Vapor will configure the environment to handle requests on this domain. Keep in mind that, due to the nature of AWS CloudFront, custom domains often take 30-45 minutes to become fully active. So, do not worry if your custom domain is not immediately accessible after deployment.

:::warning Self-Managed Domains

If you self-manage your domain's DNS records, Vapor will not be able to automatically update them. In this case, you can obtain the domain's environment CNAME records from the Vapor UI's domain detail screen or by running the vapor `record:list example.com` command. Then, you can update your DNS records at the external provider accordingly.
:::

### Multiple Domains

Vapor allows you to attach multiple domains to a single project. Before doing so, ensure you have a valid certificate for each of the domains:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        domain:
            - example1.com
            - example2.com
        build:
            - 'composer install --no-dev'
```

### Wildcard Subdomains

You may attach a domain that supports wildcard subdomains to a Vapor environment if you have a valid certificate for the domain. To attach a wildcard domain to your environment, specify a `*` as the subdomain:

```yaml
id: 2
name: vapor-laravel-app
environments:
    production:
        domain: '*.example.com'
        build:
            - 'composer install --no-dev'
```
