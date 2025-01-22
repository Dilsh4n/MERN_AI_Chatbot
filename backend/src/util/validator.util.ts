import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

const validate = (validations:ValidationChain[]) => {
    return async (req:Request, res: Response, next: NextFunction) => {
        for(let rule of validations){
            const result = await rule.run(req);
            if(!result.isEmpty()){
                break;
            }
        }

        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }

        return res.status(402).json({errors: errors.array()});
    }
}

const loginValidator = [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
]
//react zod, react yup
const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,


    // body("password")
    // .trim()
    // .isLength({ min: 6 })
    // .withMessage("Password must be at least 6 characters long")
    // .matches(/(?=.*[A-Z])/)
    // .withMessage("Password must contain at least one uppercase letter")
    // .matches(/(?=.*[a-z])/)
    // .withMessage("Password must contain at least one lowercase letter")
    // .matches(/(?=.*\d)/)
    // .withMessage("Password must contain at least one number")
    // .matches(/(?=.*[@$!%*?&#])/)
    // .withMessage("Password must contain at least one special character (@, $, !, %, *, ?, &, #)")
]

const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required")
];
export { validate, signupValidator,loginValidator,chatCompletionValidator};