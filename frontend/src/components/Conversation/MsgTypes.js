import React from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// the text will come from props by destructuring the props
const TimeLine = ({ ele }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Divider width="46%" />
            <Typography variant="caption" sx={{ color: theme.palette.text }}>{ele.text}</Typography>
            <Divider width="46%" />

        </Stack>
    );
};

// the numerical value of material ui x * 8 = 8x px
// the text will come from props by destructuring the props
const TextMessage = ({ ele }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{ backgroundColor: ele.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5, width: "max-content", }}>
                <Typography variant="body2" color={ele.incoming ? theme.palette.text : "#fff"}>
                    {ele.message}
                </Typography>
            </Box>
        </Stack>
    )
}

// used to send images
const MediaMessage = ({ ele }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{ backgroundColor: ele.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5, width: "max-content", }}>
                <Stack spacing={1}>
                    <img src={ele.img} alt={ele.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
                </Stack>
                <Typography variant="body2" color={ele.incoming ? theme.palette.text : "#fff"} >
                    {ele.message}
                </Typography>
            </Box>
        </Stack >
    );
};


const ReplyMsg = ({ ele }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{ backgroundColor: ele.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5, width: "max-content", }}>
                {/* for an choosen reply*/}
                <Stack spacing={2}>
                    {/* to render original message */}
                    <Stack p={2} direction={"column"} spacing={3} alignItems={"center"} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
                        <Typography variant="body2" color={theme.palette.text}> {ele.message} </Typography>
                    </Stack>
                    <Typography variant="body2" color={ele.incoming ? theme.palette.text : "#fff"}> {ele.reply} </Typography>
                </Stack>
            </Box>
        </Stack>
    )
}



export { TimeLine, TextMessage, MediaMessage, ReplyMsg }