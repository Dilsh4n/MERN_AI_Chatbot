import { Router } from "express";
import { verifyToken } from "../util/tokenManager.util.js";
import { chatCompletionValidator, validate } from "../util/validator.util.js";
import { deleteChatForUser, generateChatCompletion, sendChatsToUser } from "../controller/chats.controller.js";
import { send } from "process";

const chatRoutes = Router();

chatRoutes.post("/new",validate(chatCompletionValidator),verifyToken,generateChatCompletion);
chatRoutes.get("/all",verifyToken,sendChatsToUser);
chatRoutes.delete("/delete",verifyToken,deleteChatForUser);


export default chatRoutes;