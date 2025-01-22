import { NextFunction, Request, Response } from "express";
import User from "../models/user.models.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../util/tokenManager.util.js";
import { COOKIE_NAME } from "../util/constants.js";

export const getTestUser = (req:Request,res:Response,next:NextFunction) =>{
    res.send("Hello from User Controller")
}

export const getAllUsers =async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const users = await User.find({});
        return res.status(200).json({success:true,message:"OK", data: users});
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,message:"Error",cause:error.message});
    }
} 

export const userSignUp = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {name,email,password} = req.body;
        const encryptedPassword = await hash(password,10);
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(401).json({success:false,message:"Error",cause:"User with this eamil already exists"});
        }
        const newUser = new User({name,email,password:encryptedPassword});
        await newUser.save();

        //CREATE USER AND STORE COOKIES
        const token = createToken(newUser._id.toString(),newUser.email,"7d");
        const expirestime = new Date();
        expirestime.setDate(expirestime.getDate() + 7);

        res.cookie(COOKIE_NAME,token,{
            path : '/',
            domain: 'localhost',
            expires: expirestime,
            httpOnly: true,
            signed: true
        })

        return res.status(201).json({success:true,message:"User Created",name:newUser.name,email:newUser.email});
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:"Error", cause:error.message});
    }
};

export const userLogin = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send("User not registered")
        }

        const isValidPw = await compare(password,user.password);
        if(!isValidPw){
            return res.status(403).send("Invalid Password");
        }

        //CLEAR PREVIOUSE COOKIES 
        res.clearCookie(COOKIE_NAME,{
            path : '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true
        });

        //CREATE NEW TOKEN AND STORE COOKIES
        const token = createToken(user._id.toString(),user.email,"7d");
        const expirestime = new Date();
        expirestime.setDate(expirestime.getDate() + 7);

        res.cookie(COOKIE_NAME,token,{
            path : '/',
            domain: 'localhost',
            expires: expirestime,
            httpOnly: true,
            signed: true
        })
        return res.status(200).json({success:true,message:"User Logged In",name:user.name,email:user.email});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:"Error", cause:error.message});
    }
};

export const verifyUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtdata.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned")
        }
        if(user._id.toString() !== res.locals.jwtdata.id){
            return res.status(401).send("Permissions didn't match")
        }
        return res.status(200).json({success:true,message:"User Logged In",name:user.name,email:user.email});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:"Error", cause:error.message});
    }
};


export const logoutUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtdata.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned")
        }
        if(user._id.toString() !== res.locals.jwtdata.id){
            return res.status(401).send("Permissions didn't match")
        }
        
        res.clearCookie(COOKIE_NAME,{
            path : '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true
        });

        return res.status(200).json({success:true,message:"User Logged Out"});

    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:"Error", cause:error.message});
    }
};

