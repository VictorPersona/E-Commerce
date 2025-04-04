import jwt from "jsonwebtoken"

const authUser = async(req,res,next)=>{
    const {token} = req.headers

    if(!token){
        res.json({success:false,message:"Token not available"})
        return;
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(req.body.userID===decode.id){
            res.json({success:true,message:"User Authenticated"})
            next()
        }
        else{
            res.json({success:false,message:"Usr Authentication Failed"})
            return;
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error in User Authentication"})
    }
}

export default authUser