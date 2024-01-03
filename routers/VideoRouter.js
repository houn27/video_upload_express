const express=require('express');
const multer=require('multer');
const videoController=require('../uploads/VideoController');


var upload=multer({dest:'uploads/'})
var video_router=express.Router()

//upload.single('video') get file from request params
video_router.post('/upload',upload.single('video'),(req,res)=>{
    //console.log(req.body.account);
    // console.log('req.file: ',req.file);
    // console.log('req.body: ',req.body);
    videoController.uploadVideo(req,res);
    
})

video_router.get('/play',(req,res)=>{

    videoController.playVideo(req,res);
})

//get video list of an author
video_router.get('/playlist',(req,res)=>{
    videoController.myVideoList(req,res);
})


module.exports=video_router;