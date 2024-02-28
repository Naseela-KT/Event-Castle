import jwt from 'jsonwebtoken'
import {Response} from 'express';

const generateAdminToken=async(res:Response,adminId:string)=>{
    const token=jwt.sign({adminId},process.env.JWT_SECRET!,{
        expiresIn:'30d'
    })

    res.cookie('jwt',token,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:30*24*60*60*1000
    })
}

export default generateAdminToken