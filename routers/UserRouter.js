const express=require('express');
const userController=require('../controllers/UserController');

var user_router=express.Router()

user_router.post('/login',(req,res)=>{
    userController.login(req,res);
});

user_router.get('/logout',(req,res)=>{
    userController.logout(req,res);
});

user_router.post('/register',(req,res)=>{
    userController.register(req,res);
});

user_router.get('/userinfo',(req,res)=>{
    userController.userInfo(req,res);
});


module.exports=user_router