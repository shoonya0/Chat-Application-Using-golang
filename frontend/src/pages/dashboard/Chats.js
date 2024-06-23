import React from 'react'
import { Box, IconButton, Stack, Typography, InputBase, Button, Divider, Avatar, Badge } from '@mui/material'
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react'
import { styled, alpha, useTheme } from '@mui/material/styles'
import { faker } from '@faker-js/faker'
import { ChatList } from '../../data'
import { SimpleBarStyle } from '../../components/Scrollbar'


// here StyledBadge is a component which is made from Badge and we have applied some css to it
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


// here ChatElement is a component which is used to display the chat elements
const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    const theme = useTheme();
    return (
        <Box p={2} sx={{ width: "100%", borderRadius: 1, backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default }}>
            <Stack direction="row" alignItems={"center"} justifyContent="space-between">

                <Stack direction="row" spacing={2} >
                    {/* here we are checking if the user is online or not to show the status*/}
                    {
                        online ?
                            <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                                <Avatar src={faker.image.avatar()} />
                            </StyledBadge>
                            :
                            <Avatar src={faker.image.avatar()} />
                    }

                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2"> {name} </Typography>
                        <Typography variant="caption"> {msg} </Typography>
                    </Stack>
                </Stack>

                <Stack spacing={2} alignItems={"center"}>
                    <Typography sx={{ fontWeight: 600 }} variant="caption"> {time} </Typography>
                    <Badge color="primary" badgeContent={unread} />
                </Stack>

            </Stack>
        </Box >
    )
}


// here Search is act as container which is made from div and we have applied some css to it
const Search = styled("div")(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.default, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
}));


// here SearchIconWrapper is a component which is made from div and we have applied some css to it
const SearchIconWrapper = styled("div")(({ theme }) => ({
    // here theme.spacing(0 ,2) is used to give padding to the component from top and bottom
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

// here StyledInputBase is a component which is made from InputBase and we have applied some css to it which provides us to write in
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    // "& .MuiInputBase-input": is used to apply css to the input field
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
    },
}));

const Chats = () => {
    const theme = useTheme();
    return (
        // this component is like a div from Material-UI but with some extra features
        <Box sx={{ position: 'relative', width: 320, backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)' }}>

            <Stack p={3} spacing={2} sx={{ height: '100vh' }}>

                {/* top of chats */}
                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                    {/* this component is use to write different content */}
                    <Typography variant="h5"> Chats </Typography>
                    <IconButton>
                        <CircleDashed />
                    </IconButton>
                </Stack>

                {/* searching box logic and styling */}
                <Stack sx={{ width: "100%" }}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color="#709CE6" />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search..." />
                    </Search>
                </Stack>

                {/* archive ,icon and Horiz... line divider */}
                <Stack spacing={1}>
                    <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
                        <ArchiveBox size={24} />
                        <Button>Archive</Button>
                    </Stack>
                    <Divider />
                </Stack>

                {/* chat elements */}
                <Stack direction="column" spacing={2} sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}>
                    <SimpleBarStyle timeout={500} clickOnTrack={false} >
                        <Stack spacing={2.4}>
                            <Typography variant="subtitle2" sx={{ color: "#676767" }}> Pinned </Typography>
                            {/* here we are filtering the pinned chats and then mapping them to display */}
                            {ChatList.filter((el) => el.pinned === true).map((el) => {
                                return <ChatElement {...el} />
                            })}
                        </Stack>
                        <Stack spacing={2.4}>
                            <Typography variant="subtitle2" sx={{ color: "#676767" }}> All Chats </Typography>
                            {/* here we are filtering the pinned chats and then mapping them to display */}
                            {ChatList.filter((el) => !el.pinned).map((el) => {
                                return <ChatElement {...el} />
                            })}
                        </Stack>
                    </SimpleBarStyle>
                </Stack>
            </Stack>

        </Box>
    )
}

export default Chats