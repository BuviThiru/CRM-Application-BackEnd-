const {signUp,signIn,isAuthenticated} = require("../services/auth.service")


exports.signUp =  async(req,res)=>{
 try{
    const data = await signUp(req.body) 
    console.log(data) 
   let result;
   let statusCode
   if(data.error || !data){
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
 }catch(err){
    console.log(err)
 }
}

exports.signIn=async(req,res)=>{
  try{
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
  }catch(err){
    console.log(err)
 }

}

