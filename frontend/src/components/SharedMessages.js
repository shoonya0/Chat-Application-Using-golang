import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react'
import { useDispatch } from 'react-redux';
import { UpdateSidebarType } from '../redux/slice/app';
import { CaretLeft } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import { SHARED_DOCS, SHARED_LINKS } from '../data';
import { DocMsg, LinkMsg } from './Conversation/MsgTypes';

const SharedMessages = () => {

  const theme = useTheme();

  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box sx={{ boxShadow: "0px 0px 2px rgba(0 , 0, 0, 0.25)", width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background }}>
          <Stack direction={"row"} sx={{ height: "100%", p: 2 }} alignContent={"center"} spacing={3}>
            {/* here dispatch is used to dispatch the action to the reducer menans to update the state and ToggleSidebar is the function which is used to toggle the sidebar */}
            <IconButton onClick={() => { dispatch(UpdateSidebarType("CONTACT")) }}><CaretLeft /></IconButton>
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
        </Box>

        <Tabs sx={{ px: 2, pt: 2 }} value={value} onChange={handleChange} centered>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>

        {/* Body */}
        <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll" }} p={3} spacing={value === 1 ? 1 : 3}>

          {/* here I have implemented imiditily invoked function expression {IIFE} to render the sidebar component based on the type of the sidebar */}
          {(() => {
            switch (value) {
              case 0:
                // we are going to render our images or video for media
                return (<Grid container spacing={2}>
                  {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((Item) => {
                      return <Grid item xs={4}>
                        <img src={faker.image.avatar()} alt={faker.name.fullName()} />
                      </Grid>
                    })
                  }
                </Grid>);
              case 1:
                // we are going to render our links
                return SHARED_LINKS.map((ele) => <LinkMsg ele={ele} />)
              case 2:
                // we are going to render our documents
                return SHARED_DOCS.map((ele) => <DocMsg ele={ele} />)
              default:
                break;
            }
          })()}
        </Stack>

      </Stack>
    </Box>
  );
};

export default SharedMessages