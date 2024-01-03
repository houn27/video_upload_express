const video_model=require('../models/Video');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const constant=require('../utils/Constant');
const path=require('path');

async function myVideoList(req,res){
    //get user id from jwt
    var decoded = jwt.verify(req.headers.authorization.split(' ')[1], constant.TOKEN_SECRET);
    var user_id=decoded.id;

    //get videos belongs to the user
    var result_list=await video_model.ListVideoByUser(user_id);
    if(result_list.length>0){
        res.send({
            status:0,
            msg:'get '+result_list.length+' videos',
            data:result_list
        })
    }else{
        res.send({
            status:1,
            msg:'cannot find none'
        })
    }

}

async function uploadVideo(req,res){
    //get user id from jwt
    var decoded = jwt.verify(req.headers.authorization.split(' ')[1], constant.TOKEN_SECRET);
    var user_id=decoded.id;
    
    //req.file get file data in request
    saveVideo(req.file,user_id).then(data=>{
        res.send({
            status:0,
            msg:'upload succuess',
            data:{"video_id":data}
            })
    }).catch(err=>{
        res.send({
            status:1,
            msg:{error:String(err)}
        })
    })

}

//read file from request, write in the local disk
function saveVideo(file,auth_id) {
    return new Promise((resolve,reject)=>{
        fs.readFile(file.path,async (err,data)=>{
            if(err) reject(err);
            let videoName=file.originalname.split('.')[0]+'-'+Date.now()+'.'+file.originalname.split('.')[1];
            
            //write file to local
            await fs.writeFile(path.join(__dirname,videoName),data,err =>{
                if(err) reject(err);
                //resolve(videoName);
            })

            //save record to db
            var result_list=await video_model.createVideo(auth_id,file.originalname.split('.')[0],videoName,Date.now());

            if(result_list.length>0){
                var video_id=result_list[0];
                resolve(video_id);
            }else{
                reject(new Error('failed to save in db'));
            }

            //delete binary file
            await fs.unlink(file.path,err =>{
                if(err) reject(err);
            })
        })
    })
}

function playVideo(req,res){
    let filePath = __dirname+'/'+req.query.filename;
    let stat = fs.statSync(filePath);

    console.log("getting video: "+JSON.stringify(stat));

    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size
    });
    
    let readStream = fs.createReadStream(filePath);
    //write read file to response via pipes
    readStream.pipe(res);
}

function playVideoStream(req,res){
    let filePath = __dirname+'/'+req.query.filename;
    let stat = fs.statSync(filePath);
    let fileSize=stat.size;
    let range=req.headers.range;

    //split way: send a part of video
    if(range){
        //get start and end points
        let parts=range.replace(/bytes/,'').split('-');
        let start=parseInt(parts[0],10);
        //split size of a part as 1MB
        let end=parts[1]?parseInt(parts[1],10):start+1*1024*1024;
        end=Math.min(end,fileSize-1);
        let content_length=end-start+1;

        //read the part of file
        let readStream=fs.createReadStream(filePath,{start,end});

        //create response
        let head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': content_length,
            'Content-Type': 'video/mp4',
          };
        res.writeHead(206,head);
        readStream.pipe(res);

    //normal way: send whole video
    }else{
        res.writeHead(200, {
            'Content-Type': 'video/mp4',
            'Content-Length': stat.size
        });
        
        let readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
}

module.exports={
    uploadVideo,playVideo,playVideoStream,myVideoList
}