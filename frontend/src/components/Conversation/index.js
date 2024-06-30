import React from 'react'
import { Stack, Box } from '@mui/material'
import Header from './Header';
import Footer from './Footer';
import Message from './Message';

const Conversation = () => {
    // // here we are using the useTheme hook to get the current theme which is provided by the material ui
    // const theme = useTheme();
    return (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>

            {/* Header of the chat */}
            <Header />

            {/* Messages */}
            <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
                <Message menu={true} />
            </Box>

            {/* Footer of the chat such as write */}
            <Footer />
        </Stack >
    )
}

export default Conversation