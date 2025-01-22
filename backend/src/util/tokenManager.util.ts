import { NextFunction, Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';


export const createToken = (id: String, email : String, expiredin: string ) => {
    const payload = {id,email};
    const token  = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: expiredin
    })

    return token;
}

export const verifyToken = async(req:Request,res:Response,next:NextFunction) => {
    const token = req.signedCookies[`${COOKIE_NAME}`]
    if(!token || token.trim() === ""){
        return res.status(401).json({success:false,message:"Error",cause:"Token not Recieved"});
    }
    return new Promise<void>((resolve,reject) => {
        return jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
            if(err){
                return reject(err);
            }
            resolve();
            res.locals.jwtdata = decoded;
            return next();
        })
    })
}