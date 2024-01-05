const knex=require('./Knex');


function createVideo(auth_id,name,path,date){
    //knex is a promise object
    return knex('video')
    .insert({auth_id:auth_id,name:name,path:path,create_date:date});
}

function ListVideoByUser(auth_id){
    return knex('video')
    .select()
    .where({auth_id:auth_id});
}

module.exports={
    createVideo,ListVideoByUser
}