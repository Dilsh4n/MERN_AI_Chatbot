import express from 'express';
import userRoutes from './userRoutes.js';
import chatRoutes from './chatRoutes.js';

const appRouter = express.Router();

appRouter.use("/user",userRoutes);
appRouter.use("/chat",chatRoutes);

appRouter.get("/",(req,res) => {return res.send("server is ready to use")})

export default appRouter