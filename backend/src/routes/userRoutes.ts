import { Express, Router } from "express";
import { getAllUsers, getTestUser, userLogin, userSignUp } from "../controller/user.controller.js";
import { loginValidator, signupValidator, validate } from "../util/validator.util.js";

const userRoutes = Router();

//test user function
userRoutes.get('/',getTestUser);

//get all users function
userRoutes.get('/all',getAllUsers);

userRoutes.post("/signup",validate(signupValidator),userSignUp);

userRoutes.post("/login",validate(loginValidator),userLogin);

export default userRoutes;  