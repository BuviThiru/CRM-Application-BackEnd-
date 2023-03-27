const {signUp,signIn} = require("../services/auth.service")


exports.signUp =  async(req,res)=>{
    const data = await signUp(req.body) 
    console.log(data) 
   let result;
   let statusCode
   if(data.error){
    statusCode = 403;
    result = data.error;
 
   }else{
    statusCode = 201;
    result = data.user;
   }  
    res.status(statusCode).json({
        status :statusCode,    
        Message : result,
    })
}

exports.signIn=async(req,res)=>{
   const data = await signIn(req.body)
   let result;
   let statusCode
   if(data.error){
    statusCode = 401;
    result = data.error;
 
   }else{
    statusCode = 201;
    result = data.data;
   }  
    res.status(statusCode).json({
        status :statusCode,    
        Message : result,
    })

}