const user_model=require('../models/User');
const jwt = require('jsonwebtoken');
const constant=require('../utils/Constant')


async function login(req,res){
    if(!req.body.account|| !req.body.password){
        res.send({
            status:1,
            msg:'invalid parameter'
        })
        return;
    }
    let result_list=await user_model.findUserByPwd(req.body.account,req.body.password);

    if(result_list.length>0){
        let user=result_list[0];
        //console.log(user);
        let token = jwt.sign({id:user.id}, constant.TOKEN_SECRET, {
            expiresIn : 60 * 60 * 24    //valid in 24 hours
        });
        res.send({
            status:0,
            msg:'login succuess',
            data:{token:token,id:user.id}
            })
    }else{
        res.send({
            status:1,
            msg:'username or password is incorrect'
        })
    }
}

function logout(req,res){
    //decode jwt info
    var decoded = jwt.verify(req.headers.authorization.split(' ')[1], constant.TOKEN_SECRET);
    console.log(decoded);
    res.send({
        status:0,
        msg:'logout succuess'
    })
}

async function register(req,res){
    //get parameter
    var username=req.body.account;
    var nickname=req.body.nickname;
    var password=req.body.password;

    //insert user in DB
    var result_list=await user_model.createUser(username,nickname,password);
    if(result_list.length>0){
        var user_id=result_list[0];
        console.log('register successfully with id: ',user_id);
        res.send({
            status:0,
            msg:'register succuess',
            data:{"id":user_id}
            })
    }else{
        res.send({
            status:1,
            msg:'register failed'
        })
    }

}


async function userInfo(req,res){
    //get user id from jwt
    var decoded = jwt.verify(req.headers.authorization.split(' ')[1], constant.TOKEN_SECRET);
    var user_id=decoded.id;

    //get user info 
    let result_list=await user_model.findUserById(user_id);

    if(result_list.length>0){
        let user=result_list[0];
        //console.log(user);
        res.send({
            status:0,
            msg:'get user info succuess',
            data:{
                'id':user.id,
                'username':user.username,
                'nickname':user.nickname
            }
            })
    }else{
        res.send({
            status:1,
            msg:'user does not exist'
        })
    }
}

module.exports={
    login,logout,userInfo,register
}