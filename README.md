# Unflare - Untorch clone

Untorch referral tool open-source clone based on Laravel (PHP) & Bootstrap3.  
**Demo** on : <http://unflare.yebsoft.com>

## Non-technical?

Use [Kickofflab](http://kickofflabs.com/): <https://www.youtube.com/watch?t=160&v=QnPb8UvVC5o>

## Requirements

- LAMP Shared Hosting: PHP 5.4, MySQL (or PostgreSQL), Apache with Rewriting or (Nginx)
- a [Mandrill account](Mandrillapp.com) (free up to 12 000 emails per month) to send & track emails

## Setup

- GIT clone Repo or Copy files to your Host server
- PHP: Setup dependencies
```shell
php unflare\application\config\composer install
```
- Database: Create new database and execute table creations with `data\unflare_mysql_schema.sql`. There's also a postgres version. 
- Web Server: Point Apache virtualhost entry point to `public/` folder. There's also an Nginx configuration in `data/nginx.conf`
- Copy `application\constants.EXAMPLE.php` to 'application\constants.php` and edit parameters.
- Change  `config\unflare.php` according to your needs

### Troubleshoots?

- if your Apache setup points to a different folder from `public` (let's say `htdocs`), change the value in `bootstrap.php`:  
```php
// define('ASSETS_PATH', ROOT_PATH. 'public/assets/');
define('ASSETS_PATH', ROOT_PATH. 'htdocs/assets/');
```
- check logs in `/temp/logs/*.log`

## Customize Views

All pages & emails views are stored in `unflare\application\views` and use the Laravel Blade templating system.

According to Springsheld explanations video, it is advised to keep the same layout structure and copywriting length.

## Assets source compiling (Expert)

- Use Nginx provided configuration or add to Apache the following directive:
`Alias /minified / /www/unflare/temp/minified`
- Set `SHARED_HOSTING` to false to use minified folder
- Run Grunt: 
```shell
cd unflare\assets\grunt\ && npm install -g grunt && npm install && grunt
```

## Other

- Logo by logoinstant: http://www.logoinstant.com/modern-flow-logo/
