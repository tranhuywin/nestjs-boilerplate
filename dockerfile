FROM mysql

# Define environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=joke
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

EXPOSE 3306

CMD ["mysqld"]