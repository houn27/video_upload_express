//config of jwt intercepter midware
const {expressjwt : expressJWT} =require('express-jwt');
const constant=require('./Constant')

const jwtConfig=expressJWT({
    secret:constant.TOKEN_SECRET,
    algorithms:["HS256"],
    getToken: function fromHeaderOrQuerystring(req) {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      },
}).unless({path:['/login','/user/login','/user/register','/register']});

function jwtError(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token...");
    } else {
      next(err);
    }
}



module.exports={
    jwtConfig,jwtError
}