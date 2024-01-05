const knex=require('knex')({
    client:'mysql',
    connection:{
        host:'127.0.0.1',
        user:'root',   
        password:'', // your mysql password
        database:'db_video'
    }
})

module.exports=knex;