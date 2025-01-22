import { Avatar, Box, Typography } from "@mui/material";
import logo from "../../../public/openai.png";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Chatitem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const auth = useAuth();

  const nameAvatar = () => {
    const fullname = auth?.user?.name;
    if (fullname) {
      return fullname.split(" ").length > 1
        ? fullname.split(" ")[0][0] + fullname.split(" ")[1][0]
        : fullname[0];
    } else return "U";
  };

  const extractCodeFromString = function (message: string) {
    if (message.includes("```")) {
      const codesnipet = message.split("```");
      console.log("codesnipet", codesnipet);
      return codesnipet;
    }
  };

  const isCodeBlock = (str: string) => {
    if (
      str.includes("=") ||
      str.includes(";") ||
      str.includes("[") ||
      str.includes("]") ||
      str.includes("{") ||
      str.includes("}") ||
      str.includes("//")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const messageBlocks = extractCodeFromString(content);
  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        border: "2px solid #004d56",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) => {
            const language = block[0]?.split(/\s+/)[0];

            return isCodeBlock(block) ? (
              <SyntaxHighlighter
                style={coldarkDark}
                language={language}
                customStyle={{
                  width: "100%", // Use the full width of the parent container
                  marginBottom: "10px", // Remove default margins
                  padding: "10px", // Add consistent padding
                  borderRadius: "5px", // Optional: Rounded corners for aesthetics
                  overflowX: "auto", // Enable horizontal scrolling for long lines
                  whiteSpace: "pre-wrap", // Wrap lines if they exceed container width
                  wordBreak: "break-word", // Break long words if needed
                }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            );
          })}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "transparent",
        border: "2px solid green",
        my: 2,
        gap: 2,
      }}
    >
      <Avatar sx={{ ml: 0, bgcolor: "black", color: "white" }}>
        {nameAvatar()}
      </Avatar>
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) => {
            const language = block[0]?.split(/\s+/)[0];

            return isCodeBlock(block) ? (
              <SyntaxHighlighter
                style={coldarkDark}
                language={language}
                customStyle={{
                  width: "100%", // Use the full width of the parent container
                  marginBottom: "10px", // Remove default margins
                  padding: "10px", // Add consistent padding
                  borderRadius: "5px", // Optional: Rounded corners for aesthetics
                  overflowX: "auto", // Enable horizontal scrolling for long lines
                  whiteSpace: "pre-wrap", // Wrap lines if they exceed container width
                  wordBreak: "break-word", // Break long words if needed
                }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            );
          })}
      </Box>
    </Box>
  );
};

export default Chatitem;
