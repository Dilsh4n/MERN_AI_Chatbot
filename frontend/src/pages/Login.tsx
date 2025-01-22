import { Box, Button, Typography } from "@mui/material";
import airobot from "../../public/airobot2.png";
import React, { FormEvent, useEffect } from "react";
import { CgEnter } from "react-icons/cg";
import { Form, useNavigate } from "react-router-dom";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();
  const auth = useAuth();

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if(auth?.isLoggedIn){
      navigate('/chat');
    }
  },[auth])


  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    console.log(email,password)
    try {
      toast.loading('Logging in...',{id:'login'});
      await auth?.login(email,password);
      toast.success('Logged in successfully',{id:'login'});
      await wait(5000);
      navigate('/chat');
    } catch (error) {
      console.log(error);
      toast.error('Login failed',{id:'login'});
    }
  }


  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box
        padding={12}
        mt={12}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img src={airobot} alt="robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={1}
        ml={"auto"}
        mt={16}
      >
        <form style={{ 
          margin: "auto",
          padding: "30px",
          boxShadow: "10px 10px 20px black",
          border:'none',
          }} onSubmit={handleSubmit}>
            <Box sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
            }}>
              <Typography variant="h4" align="center" padding={2} fontWeight={600} sx={{color:"#ff5500"}}>Login</Typography>
              <CustomizedInput type="email" name="email" label="Email" />
              <CustomizedInput type="password" name="password" label="Password"/>
              <Button type="submit" sx={{px:4, py:2, mt:2, backgroundColor:"#ff5500", color:"white"}} variant="contained" endIcon={<CgEnter/>}>Login</Button>
            </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
function wait(arg0: number) {
  throw new Error("Function not implemented.");
}

