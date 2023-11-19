FROM gotfly/nginx-php7-mysql:php7.4

WORKDIR /www/app
COPY . /www/app

# Create additional directory
RUN cd /www/app && \
    chown -R www-data ./*

COPY ./config/nginx /etc/nginx/sites-enabled

# Clear all develop data
RUN rm -rf /www/app/Dockerfile /www/app/config /www/app/build.sh supervisord* .git
