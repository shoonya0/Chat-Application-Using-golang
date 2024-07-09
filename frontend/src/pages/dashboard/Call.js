import React from 'react'
import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { useTheme } from '@emotion/react'
import { SimpleBarStyle } from '../../components/Scrollbar'
import { CallLogElement } from '../../components/CallElement'
import { CallLogs } from '../../data'
import StartCall from '../../sections/main/StartCall'


const Call = () => {
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
              <Typography variant="h5">Call Logs</Typography>
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
              <Typography variant="subtitle2" component={Link}>Start Conversion</Typography>
              <IconButton
                onClick={() => setOpenDialog(true)}
              ><Plus style={{ color: theme.palette.primary.main }} /></IconButton>
            </Stack>
            <Divider />

            <Stack spacing={3} sx={{ flex: 1, overflowY: "scroll", height: "100%" }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.5}>
                  {/* call Logs */}
                  {CallLogs.map((ele) => <CallLogElement {...ele} />)}

                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>


        {/* right */}
        {/* Todo -> reuse conversion component */}

      </Stack>
      {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog} />}
    </>
  )
}

export default Call 