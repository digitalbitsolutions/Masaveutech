# Redirect Deployment Checklist (nginx)

## 1) Apply redirects in server config

1. Open the nginx server block for `masaveutech.com` (HTTPS vhost).
2. Copy rules from `nginx/legacy-redirects.conf` inside the same `server {}` block.
3. Place them before broad `try_files`/fallback rules.

## 2) Publish static SEO files

Ensure these files are deployed at site root:

- `robots.txt`
- `sitemap.xml`
- `404.html` (optional but recommended)

Do not upload local secret files/folders (especially `ignore/`).
Remove stale files from previous deploys (`assets/`, `masaveutech.com.zip`) so they cannot be crawled.

## 3) Reload nginx

```bash
nginx -t
systemctl reload nginx
```

## 4) Verify redirects

Expected: canonical/legacy URLs return `301`, live URLs return `200`, and removed artifacts return `404` or `410`.

```bash
curl -I https://masaveutech.com/index.html
curl -I https://masaveutech.com/es/index.html
curl -I https://masaveutech.com/en/nuestro-fundador/
curl -I https://masaveutech.com/nuestro-fundador/
curl -I https://masaveutech.com/wp-sitemap.xml
curl -I https://masaveutech.com/sitemap.xml
curl -I https://masaveutech.com/robots.txt
curl -I https://masaveutech.com/assets/index.html
curl -I https://masaveutech.com/masaveutech.com.zip
```

## 5) Google Search Console

1. Submit `https://masaveutech.com/sitemap.xml`.
2. Use URL Inspection on old URLs and click "Request indexing".
3. Monitor Coverage/Pages report for falling 404 count over the next days.
