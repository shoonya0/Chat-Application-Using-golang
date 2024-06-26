import React from 'react'
import { Stack, Box, IconButton, TextField, InputAdornment, Fab, Tooltip } from '@mui/material'
import { useTheme, styled } from '@mui/material/styles'
import { Camera, File, Image, LinkSimple, PaperPlaneTilt, Smiley, Sticker, User, } from 'phosphor-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// here StyleInput is a component which is made from TextField and we have applied some css to it for footer input
const StyleInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
    }
}))

// action buttons in the footer for sending images, stickers, images, documents, and contacts
const Action = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video"
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers"
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image"
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document"
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact"
    },
];

// functional component
const ChatInput = ({ setOpenPiker }) => {
    const [openActions, setOpenActions] = React.useState(false)
    return (
        <StyleInput fullWidth placeholder='Write a message...' variant="filled"
            InputProps={{
                disableUnderline: true,
                startAdornment:
                    <Stack sx={{ width: "max-content" }}>
                        <Stack sx={{
                            position: "relative",
                            display: openActions ? "inline-block" : "none"
                        }}>
                            {Action.map((ele) => (
                                <Tooltip title={ele.title} placement="right" >
                                    <Fab sx={{ position: "absolute", top: -ele.y, backgroundColor: ele.color }}>
                                        {ele.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>
                        <InputAdornment>
                            <IconButton onClick={() => setOpenActions((preVal) => !preVal)}>
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    </Stack >,
                endAdornment:
                    <InputAdornment>
                        <IconButton onClick={() => { setOpenPiker((prevVal) => !prevVal); }}>
                            <Smiley />
                        </IconButton>
                    </InputAdornment >
            }} />
    );
};



const Footer = () => {
    // here we are using the useTheme hook to get the current theme which is provided by the material ui
    const theme = useTheme();
    // using state hook to toggle the emoji piker
    const [openPiker, setOpenPiker] = React.useState(false);

    return (
        //  Footer of the chat such as write 
        < Box p={2} sx={{ width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0 , 0 , 0 ,0.25)" }}>
            <Stack direction={"row"} alignItems={"center"} spacing={3}>

                <Stack sx={{ width: "100%" }}>
                    <Box sx={{ display: openPiker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
                        {/* emoji piker */}
                        <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
                    </Box>
                    {/* Chat Input */}
                    <ChatInput setOpenPiker={setOpenPiker} />
                </Stack>

                {/* send button */}
                <Box sx={{ height: 48, width: 48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>

                    <Stack sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>
                        <IconButton>
                            <PaperPlaneTilt color="#fff" />
                        </IconButton>
                    </Stack>

                </Box>

            </Stack>
        </ Box>
    );
};

export default Footer