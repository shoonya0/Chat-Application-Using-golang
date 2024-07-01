import React from 'react'
import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Bell, CaretLeft, Divide, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from 'phosphor-react';
import { faker } from '@faker-js/faker';

const Settings = () => {
  const theme = useTheme();

  const list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notification",
      onclick: () => { },
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => { },
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => { },
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      // onclick: handleOpenTheme,
      onclick: () => { },
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => { },
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Data",
      onclick: () => { },
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      // onclick: handleOpenShortcuts,
      onclick: () => { },
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => { },
    },
  ];

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* LeftPanel */}
        <Box sx={{
          overflowY: "scroll", height: "100vh", width: 320, boxShadow: "0px 0px 2px rgba(0 ,0 ,0 ,0.25)",
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background
        }}>
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton >
                <CaretLeft size={24} color={"#4B4B4B"} />
              </IconButton>
              <Typography variant="h6">
                Settings
              </Typography>
            </Stack>
            {/* Profile section */}
            <Stack direction={"row"} spacing={3}>
              <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} sx={{ height: 56, width: 56 }} />
              <Stack spacing={0.5}>
                <Typography variant="article">
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2">
                  {faker.random.words()}
                </Typography>
              </Stack>
            </Stack>
            {/* different options */}
            <Stack spacing={4}>
              {list.map(({ key, icon, title, onclick }) => <>
                <Stack sx={{ cursor: "pointer" }} spacing={2} onclick={onclick}>
                  <Stack direction={"row"} spacing={2} alignItems="center">
                    {icon}
                    <Typography variant="body2"> {title} </Typography>
                  </Stack>
                  {key !== 7 && <Divider />}
                </Stack>
              </>)}
            </Stack>
          </Stack>
        </Box>
        {/* RightPanel */}
      </Stack>
    </>
  )
}

export default Settings