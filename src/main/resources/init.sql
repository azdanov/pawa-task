CREATE DATABASE IF NOT EXISTS pawatask;

ALTER DATABASE pawatask
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

DROP USER IF EXISTS 'pawa'@'localhost';
CREATE USER pawa@localhost IDENTIFIED BY 'pawa';
GRANT ALL PRIVILEGES ON pawatask.* TO pawa@localhost IDENTIFIED BY 'pawa';
