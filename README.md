# Vupload Backend

This is the backend part of a simple video platform consisting of functions of video uploading, video listing, video playing, user log in/out. 

#### Highlights:
* This project was built with express@4.18.2 and knex@3.1.0.
* To verify if user has logged before uploading and playing videos, implment jwt authentication as [middleware](./utils/JWTAuth.js).
* Serve videos by [express.static](./app.js)
* Here is the frontend section responsible for webpage UI: https://github.com/houn27/video_upload_angular.

![](https://raw.githubusercontent.com/houn27/public-img/main/vupload-screenshot-1.png)


# Create datebase
To run this server, ensure that you have a MySQL database installed (downloadable from: https://dev.mysql.com/downloads/installer/). Once installed, access the MySQL database and create a database named `db_video`. Subsequently, register your MySQL information in `./models/Knex.js`.

```
const knex=require('knex')({
    client:'mysql',
    connection:{
        host:'127.0.0.1',
        user:'{your mysql account username}',
        password:'{your mysql account password}',
        database:'db_video'
    }
})

module.exports=knex;
```
# Create tables

To run this project, you need to have to tables in database `db_video`. Here are the mysql command to create these 2 tables:

```
CREATE TABLE `db_video`.`user`  (
    `id` bigint(0) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NULL DEFAULT NULL,
    `nickname` varchar(255) NULL DEFAULT NULL,
    `password` varchar(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`) 
  ) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

CREATE TABLE `db_video`.`video`  (
    `id` bigint(0) NOT NULL AUTO_INCREMENT,
    `auth_id` bigint(0) NOT NULL,
    `name` varchar(255) NULL DEFAULT NULL,
    `path` varchar(255) NOT NULL,
    `create_date` bigint(0) NULL DEFAULT NULL,
    PRIMARY KEY (`id`) 
  ) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;
```


## Run project

Install all dependencies
```npm install```


Run `npm run dev` for a server which will listen  `http://localhost:8000/`. The application will automatically reload if you change any of the source files.

