const express=require("express");
const user_router=require('./routers/UserRouter');
const video_router=require('./routers/VideoRouter');
const bodyPaser=require('body-parser');
const cors=require('cors');
const jwtAuth=require('./utils/JWTAuth');

//create express object
const app=express();
app.use(bodyPaser.json());
app.use(cors());
app.use(jwtAuth.jwtConfig);
app.use(jwtAuth.jwtError);
app.use(express.static('./uploads'));

//apply router of each module
app.use('/user',user_router);
app.use('/video',video_router);

//start express server
app.listen(8000,()=>{
    console.log('========== node.js backend is running !!! =============');
})


