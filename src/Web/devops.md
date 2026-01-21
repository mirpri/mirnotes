# DevOps

- [DevOps](#devops)
  - [Get a certificate](#get-a-certificate)
    - [Install the Certbot Nginx plugin](#install-the-certbot-nginx-plugin)
    - [Run Certbot](#run-certbot)
    - [Renew licence (future)](#renew-licence-future)


## Get a certificate
If using nginx, getting a certificate with cerbot's nginx plugin is the easiest way:
### Install the Certbot Nginx plugin

```bash
sudo apt update
sudo apt install python3-certbot-nginx
```

This installs the `--nginx` plugin that Certbot needs.


###  Run Certbot

Now run:

```bash
sudo certbot --nginx -d nvapis.puppygoapp.com
```

Certbot will automatically:
* Validate via HTTP
* Install the certificate in your Nginx config
* Reload Nginx

### Renew licence (future)
```
sudo systemctl stop nginx
sudo certbot renew
sudo systemctl start nginx
```
Auto renew all licences, but causes downtime.