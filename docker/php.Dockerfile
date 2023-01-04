FROM php:5.6-apache
#RUN docker-php-ext-install mysqli
RUN apt-get update -y && apt-get install -y libpng-dev   nano  libmcrypt-dev

RUN docker-php-ext-install \
    pdo pdo_mysql \
    mcrypt \
    && a2enmod \
    rewrite

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
RUN echo "date.timezone='Europe/London'" >> "$PHP_INI_DIR/php.ini"
RUN echo "always_populate_raw_post_data = -1" >> "$PHP_INI_DIR/php.ini"
RUN echo "bcmath.scale=0" >> "$PHP_INI_DIR/php.ini"
#Install git
# RUN apt-get -y install git

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
#RUN composer update