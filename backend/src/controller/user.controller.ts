import { NextFunction, Request, Response } from "express";
import User from "../models/user.models.js";
import { hash } from "bcrypt";

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
            return res.status(400).json({success:false,message:"Error",cause:"User with this eamil already exists"});
        }
        const newUser = new User({name,email,password:encryptedPassword});
        await newUser.save();
        return res.status(201).json({success:true,message:"User Created",id:newUser._id.toString()});
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:"Error", cause:error.message});
    }
};

export const userLogin = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        // if(!user){
        //     return res.status(400).json({success:false,message:"Error",cause:"User not found"});
        // }else if(user.password. !== password){
        //     return res.status(400).json({success:false,message:"Error",cause:"Invalid Password"});
        // }else{
        //     return res.status(200).json({success:true,message:"User Found",data:user});
        // }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:"Error", cause:error.message});
    }
};