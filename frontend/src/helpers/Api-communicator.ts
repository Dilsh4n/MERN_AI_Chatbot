import axios from "axios";


//req user login and return response to frontend
export const LoginUser = async (email: string, password: string) => {
    const res = await axios.post('/user/login', { email, password });
    console.log(res)

    if(res.status !== 200){
        throw new Error('Login failed');
    }

    const data = await res.data;
    return data;
};

export const SignUp = async (name:String, email: string, password: string) => {
    const res = await axios.post('/user/signup', { name, email, password });
    console.log(res)

    if(res.status !== 201){
        throw new Error('Unable to signup');
    }

    const data = await res.data;
    return data;
};

export const checkAuth = async() => {
    const res = await axios.get('/user/authstatus');
    if(res.status !== 200){
        throw new Error('Auth failed');
    }
    const data = await res.data;
    console.log("data came with tocken check",data);
    return data;
}

export const sendChatRequest = async (message:string) => {
    const res = await axios.post('/chat/new', { message });
    if(res.status !== 200){
        throw new Error('Unable to send chat request');
    }
    const data = await res.data;
    return data;
}
export const getUserChats = async () => {
    const res = await axios.get('/chat/all');
    if(res.status !== 200){
        throw new Error('Unable to get chats');
    }
    const data = await res.data;
    return data;
}

export const deleteUserChats = async () => {
    const res = await axios.delete('/chat/delete');
    if(res.status !== 200){
        throw new Error('Unable to delete chats');
    }
    const data = await res.data;
    return data;
}

export const LogoutUser = async () => {
    const res = await axios.get('/user/logout');
    if(res.status !== 200){
        throw new Error('Logout failed');
    }
    const data = await res.data;
    return data;
}

