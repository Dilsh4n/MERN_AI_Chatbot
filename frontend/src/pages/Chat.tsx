import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import Chatitem from "../components/chat/Chatitem";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/Api-communicator";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const Chat = () => {
/*   const chat_messages: { role: "user" | "assistant"; content: string }[] = [
      { role: "user", content: "Hi, can you help me with programming?" },
      { role: "assistant", content: "Of course! What do you need help with?" },
      {role: "user",content: "I want to learn how to create a REST API in Node.js.",},
      {role: "assistant",content:"Sure! You can use the Express framework to create a REST API in Node.js. Would you like me to walk you through it?",},
      { role: "user", content: "Yes, that would be great!" },
      {role: "assistant",content:"Alright! First, you need to initialize a new Node.js project using `npm init`. Then install Express using `npm install express`. Next, create a file like `server.js` and write some basic code to set up your server.",},
    ]; */

    type MessageType = {
      role : "user" | "assistant";
      content : string
    }
    
  const [chatMessages,setChatMessages] = useState<MessageType[]>([]);
  const inputRef = useRef<HTMLInputElement|null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    console.log("use effect loaded")
    if(auth?.isLoggedIn && auth.user){
      toast.loading('Loading chats',{id:"loadchats"});
      getUserChats().then((data) => {
         setChatMessages([...data.chats]);
         toast.success('Chats loaded successfully',{id:"loadchats"});
      }).catch((err) => {
        console.log(err);
        toast.error('Unable to load chats',{id:"loadchats"});
      })
    }
  },[auth])

  useEffect(() => {
    if(!auth?.isLoggedIn){
      toast.error('Please login to continue',{id:"loginerror"});
      navigate('/login');
    }
  },[auth])

  const handleDeleteChat = async() => {
    try {
      toast.loading("Deleting chats",{id:"deletechats"});
      const response = await deleteUserChats();
      setChatMessages([]);
      toast.success(response.message,{id:"deletechats"});
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete chats",{id:"deletechats"});
    }
  }

  const nameAvatar = () => {
    const fullname = auth?.user?.name;
    if (fullname) {
      return fullname.split(" ").length > 1
        ? fullname.split(" ")[0][0] + fullname.split(" ")[1][0]
        : fullname[0];
    } else return "U";
  };

  const handlesubmit =async() => {
    toast.loading("Sending message",{id:"sendmessage"});
    const content = inputRef.current?.value as string;
    //reset ref on submit
    if(inputRef && inputRef.current){
      inputRef.current.value = '';
    }
    const newMessage:MessageType = {role:'user',content};
    setChatMessages((prev) => [...prev,newMessage]);
    const chatData = await sendChatRequest(content);
    toast.success("Message sent",{id:"sendmessage"});
    setChatMessages([...chatData.chats]);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "80%",
            height: "60vh",
            bgcolor: "transparent",
            border: "1px solid orange",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {nameAvatar()}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a chatbot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask me anything that relates to{" "}
            <b>Knowledge, Business, Advice, Education, etc.</b> But please do
            not share any of your <b>Personal Information</b> with me as I am a{" "}
            <b>bot.</b>
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: "3",
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
            onClick={handleDeleteChat}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* Chat Section */}
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        {/* Header */}
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "30px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: 600,
          }}
        >
          Model - GPT:3.5 Turbo
        </Typography>

        {/* Chat Messages */}
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            mb: 2,
          }}
        >
          {chatMessages.map((chat, index) => (
            <Chatitem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>

        {/* Input Section */}
        <Box
          sx={{
            width: "98%",
            padding: "10px",
            borderRadius: 3,
            backgroundColor: "transparent",
            border: "1px solid gray",
            display: "flex",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              fontSize: "20px",
              color: "white",
            }}
          />
          <IconButton sx={{ ml: "auto", color: "white" }} onClick={handlesubmit}>
            <IoMdSend />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
