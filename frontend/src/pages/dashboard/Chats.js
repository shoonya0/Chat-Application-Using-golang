import React from 'react'
import { Box, IconButton, Stack, Typography, Button, Divider } from '@mui/material'
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react'
import { useTheme } from '@mui/material/styles'
import { ChatList } from '../../data'
import { SimpleBarStyle } from '../../components/Scrollbar'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import ChatElement from '../../components/ChatElement'



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
                        <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
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
                                return <ChatElement key={el.id} {...el} />
                            })}
                        </Stack>
                        <Stack spacing={2.4}>
                            <Typography variant="subtitle2" sx={{ color: "#676767" }}> All Chats </Typography>
                            {/* here we are filtering the pinned chats and then mapping them to display */}
                            {ChatList.filter((el) => !el.pinned).map((el) => {
                                return <ChatElement key={el.id} {...el} />
                            })}
                        </Stack>
                    </SimpleBarStyle>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Chats