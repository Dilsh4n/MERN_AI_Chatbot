import { TextField } from "@mui/material";

 type Properties = {
    name   : string;
    type   : string;
    label : string;
 }
 
 const CustomizedInput = (props:Properties) => {
   return (
    <TextField 
        name={props.name} 
        label={props.label} 
        type={props.type} 
        variant="standard" 
        margin="normal" 
        sx={{
            input: { color: "white" }, // Change the input text color
            "& .MuiInputLabel-root": { color: "#ff5500" }, // Change the label color
            "& .MuiInputLabel-root.Mui-focused": { color: "#737170" }, // Change the label color after focus
            "& .MuiInput-underline:before": { borderBottomColor: "white" }, // Default underline color
            "& .MuiInput-underline:hover:before": { borderBottomColor: "#ff5500" }, // Hover underline color
            "& .MuiInput-underline:after": { borderBottomColor: "#ff5500" }, // Focused underline color
        }}    
    />
   )
 }
 
 export default CustomizedInput