const knex=require('./Knex');


function listAllUser(){
    //knex is a promise object
    return knex('user')
    .select()
    .where({});
}

function createUser(username,nickname,password){
    return knex('user')
    .insert({username:username,nickname:nickname,password:password});
}

function findUserByPwd(username,pwd){
    return knex('user')
    .select()
    .where({username:username,password:pwd});
}

function findUserById(user_id){
    return knex('user')
    .select()
    .where({id:user_id});
}

module.exports={
    listAllUser,findUserByPwd,findUserById,createUser
}