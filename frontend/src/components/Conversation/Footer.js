import React from 'react'
import { Stack, Box, IconButton, TextField, InputAdornment } from '@mui/material'
import { useTheme, styled } from '@mui/material/styles'
import { LinkSimple, PaperPlaneTilt, Smiley, } from 'phosphor-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// here StyleInput is a component which is made from TextField and we have applied some css to it for footer input
const StyleInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
    }
}))

// functional component
const ChatInput = ({ setOpenPiker }) => {
    return (
        <StyleInput fullWidth placeholder='Write a message...' variant="filled"
            InputProps={{
                disableUnderline: true,
                startAdornment:
                    <InputAdornment>
                        <IconButton>
                            <LinkSimple />
                        </IconButton>
                    </InputAdornment>,
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