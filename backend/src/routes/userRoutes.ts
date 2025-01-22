import { Express, Router } from "express";
import { getAllUsers, getTestUser, logoutUser, userLogin, userSignUp, verifyUser } from "../controller/user.controller.js";
import { loginValidator, signupValidator, validate } from "../util/validator.util.js";
import { verifyToken } from "../util/tokenManager.util.js";

const userRoutes = Router();

//test user function
userRoutes.get('/',getTestUser);

//get all users function
userRoutes.get('/all',getAllUsers);

userRoutes.post("/signup",validate(signupValidator),userSignUp);

userRoutes.post("/login",validate(loginValidator),userLogin);

userRoutes.get("/authstatus",verifyToken,verifyUser);

userRoutes.get('/logout',verifyToken,logoutUser)

export default userRoutes;  