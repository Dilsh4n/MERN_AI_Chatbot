import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuth, LoginUser, LogoutUser, SignUp } from "../helpers/Api-communicator";
import toast from "react-hot-toast";

type user = {
    name:string;
    email:string;
}

type UserAuth  = {
    isLoggedIn:boolean;
    user: user|null;
    login: (email:string,password:string) => Promise<void>;
    signup: (name:string,email:string,password:string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null> (null);

export const AuthProvider = ({children} : {children:ReactNode}) => {
    const [user,setUser] = useState<user|null>(null);
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        //fetch if the user cookies are valid then skip login
        async function checkStatus(){
            const data = await checkAuth();
            console.log("data recieved from checkAuth",data);
            if(data){
                setUser({email:data.email,name:data.name});
                setIsLoggedIn(true);
            }
        }

        checkStatus();
    } , [])

    const login  = async (email:string,password:string) => {
        const data = await LoginUser(email,password);
        if(data){
            setUser({email:data.email,name:data.name});
            setIsLoggedIn(true);
        }
    };
    const signup = async (name:string, email:string,password:string) => {
        const data = await SignUp(name,email,password);
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
    };
    const logout = async () => {
        await LogoutUser();
        setIsLoggedIn(false);
        setUser(null);
        toast.success("Logged out successfully");
        window.location.reload();
    };

    const value = {
        isLoggedIn,
        user,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);