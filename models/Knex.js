const knex=require('knex')({
    client:'mysql',
    connection:{
        host:'127.0.0.1',
        user:'root',
        password:'199511hu',
        database:'db_video'
    }
})

module.exports=knex;