import { NextFunction, Request, Response } from "express";
import User from "../models/user.models.js";
import { configureOpenAi } from "../config/openAi.config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const {message} = req.body;
        console.log("mesage recieved",message);
        const user  = await User.findById(res.locals.jwtdata.id);
        console.log("user found",user);
    if(!user){
        console.log("user not found");
        return res.status(401).json({success:false,message:"User not registered or Token malfunctioned"});
    }
    //grab the chat from the user
    const chats = user.chats.map(({role,content})=>({role,content})) as ChatCompletionRequestMessage[];
    chats.push({content:message,role:"user"});
    user.chats.push({content:message,role:"user"});
    //send all chats with new one to openai api
    const config = configureOpenAi();
    const openai = new OpenAIApi(config);
    //get latest response
    console.log("sending chat request to openai");
    const chatresponse = await openai.createChatCompletion({model:"gpt-4o-mini",messages:chats});
    console.log("chatresponse",chatresponse);
    console.log("chat response recieved")
    user.chats.push(chatresponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({chats:user.chats});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Error",cause:"something went wrong"});
    }
}
// model: "gpt-4o-mini",



export const sendChatsToUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtdata.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned")
        }
        if(user._id.toString() !== res.locals.jwtdata.id){
            return res.status(401).send("Permissions didn't match")
        }
        return res.status(200).json({message:'ok',chats:user.chats});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:"Error", cause:error.message});
    }
};


export const deleteChatForUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtdata.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned")
        }
        if(user._id.toString() !== res.locals.jwtdata.id){
            return res.status(401).send("Permissions didn't match")
        }

        user.chats.splice(0, user.chats.length);
        await user.save();

        return res.status(200).json({message:'deleted'});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:"Error", cause:error.message});
    }
};

