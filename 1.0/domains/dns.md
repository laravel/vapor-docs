# DNS

[[toc]]

## Introduction

As you may be aware, DNS records are used to point domain names to servers. Vapor utilizes DNS records to point your domain names to your serverless applications. Like many other deployment platforms, Vapor provides its own interface for managing all of the DNS records for your domains. This management interface is built on top of AWS Route 53.

## Creating DNS Zones

To begin managing a domain's DNS records through Vapor, you should create a "DNS Zone" for the domain. You may do this via the Vapor UI or using the `zone` CLI command. Vapor will attempt to automatically import any existing records for this domain that may exist on other DNS providers:

```bash
vapor zone example.com
```

## Nameservers

Once a zone has been created, Vapor will provide you with the DNS zone's "nameservers". At your domain registrar, you may set the domain's nameservers to the nameservers given to you by Vapor. This will specify Vapor as the entity managing the DNS records for the domain.

## Managing DNS Records

### Creating & Updating Records

Once a zone has been created for a domain, you can add, update, or remove DNS records for that zone. Vapor allows you to manage DNS records via the Vapor UI's zone detail screen or the Vapor CLI. To create a DNS record via the Vapor CLI, you may use the `record` command:

```bash
vapor record example.com A www 192.168.1.1

vapor record example.com CNAME foo another-example.com

vapor record example.com MX foo "10 example.com,20 example2.com"
```

:::tip Record Upserts

The `record` command functions as an "UPSERT" operation. If an existing record exists with the given type and name, its value will be updated to the given value. If no record exists with the given type or name, the record will be created.
:::

### Deleting Records

To delete a record via the Vapor CLI, you may use the `record:delete` command:

```bash
vapor record:delete example.com A www
```

## Deleting Zones

Zones may be deleted via the Vapor UI or using the `zone:delete` CLI command:

```bash
vapor zone:delete example.com
```

