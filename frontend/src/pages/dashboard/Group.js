import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { useTheme } from '@emotion/react'
import { SimpleBarStyle } from '../../components/Scrollbar'
import { ChatList } from '../../data'
import ChatElement from '../../components/ChatElement'
import CreateGroup from '../../sections/main/CreateGroup'

const Group = () => {
  const theme = useTheme();

  // state management for the dialog
  const [openDialog, setOpenDialog] = React.useState(false);

  // handel close fuctions
  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* left */}
        {/* here we are using theme as a callback in sx prop  */}
        <Box sx={{
          height: "100vh", backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
          width: 320, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
        }}>
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>

            <Stack>
              <Typography variant="h5">Groups</Typography>
            </Stack>

            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
              </Search>
            </Stack>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant="subtitle2" component={Link}>Create New Group</Typography>
              <IconButton onClick={() => setOpenDialog(true)}><Plus style={{ color: theme.palette.primary.main }} /></IconButton>
            </Stack>
            <Divider />

            <Stack spacing={3} sx={{ flex: 1, overflowY: "scroll", height: "100%" }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.5}>
                  {/* content */}
                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>Pinned</Typography>
                  {/* chat List */}
                  {/* here we are filtering the pinned chats and then mapping them to display */}
                  {ChatList.filter((el) => el.pinned === true).map((el) => {
                    return <ChatElement {...el} />
                  })}

                  {/* content */}
                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>All Groups</Typography>
                  {/* chat List */}
                  {ChatList.filter((el) => !el.pinned === true).map((el) => {
                    return <ChatElement {...el} />
                  })}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>


        {/* right */}
        {/* Todo -> reuse conversion component */}
      </Stack>
      {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} />}
    </>
  )
}

export default Group