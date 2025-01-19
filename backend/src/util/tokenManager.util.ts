import jwt, { SignOptions } from 'jsonwebtoken';


export const createToken = (id: String, email : String, expiredin: string ) => {
    const payload = {id,email};
    const token  = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: expiredin
    })

    return token;
}