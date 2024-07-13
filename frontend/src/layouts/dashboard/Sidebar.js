import React from 'react'
import { Avatar, Box, Divider, IconButton, Stack, Menu, MenuItem } from '@mui/material'
import useSettings from "../../hooks/useSettings";
import { useTheme } from '@mui/material/styles';
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from 'phosphor-react';
import AntSwitch from '../../components/AntSwitch';
import Logo from "../../assets/Images/logo.ico";
import { useNavigate } from "react-router-dom";

// this is the faker js library used to generate fake data
import { faker } from "@faker-js/faker"

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";
    case 1:
      return "/group";
    case 2:
      return "/call";
    case 3:
      return "/settings";
    default:
      break;
  }
}

const getMenuPath = (index) => {
  console.log(index);
  switch (index) {
    case 0:
      return "/profile";
    case 1:
      return "/settings";
    case 2:
      // token updation is still pending and setting the isAuth... to false
      return "/auth/login";
    default:
      break;
  }
}

const Sidebar = () => {
  const theme = useTheme();

  // this is the react hook used to navigate to the different pages
  const navigate = useNavigate();

  // React hook used to manage the state of the selected button
  const [selected, setSelected] = React.useState(0);

  // this is the react costom hook used to manage the settings
  const { onToggleMode } = useSettings();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // {/* metrial ui component */ }
    < Box p={2} sx={{ backgroundColor: theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0 ,0 ,0 ,0.25)", height: "100vh", width: 100 }}>

      <Stack spacing={3} direction="column" alignItems={"center"} justifyContent="space-between" sx={{ height: "100%" }}>

        <Stack alignItems={"center"} spacing={4}>
          {/* Logo */}
          <Box sx={{
            backgroundColor: theme.palette.primary.main,
            height: 64,
            width: 64,
            borderRadius: 1.5,
          }}>
            <img src={Logo} alt={"Chat app logo"} />
          </Box>

          {/* Nav Buttons */}
          <Stack spacing={3} sx={{ width: "max-content" }} alignItems={"center"} direction={"column"}>
            {/* here we have imported and ther rendering our icon by using metarial Ui component*/}
            {Nav_Buttons.map((el) => (
              el.index === selected ?
                <Box key={el.index} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }} p={1}>
                  <IconButton sx={{ width: "max-content", color: "#fff" }} key={el.index}> {el.icon} </IconButton>
                </Box>
                :
                <IconButton onClick={() => { setSelected(el.index); navigate(getPath(el.index)) }} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }} key={el.index}> {el.icon} </IconButton>

            ))}


            {/* matrial Ui component used to devide by making an horizontal or vertical line */}
            <Divider sx={{ width: "48px" }} />
            {/* here i have created an setting button */}
            {selected === 3 ?
              <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }} p={1}>
                <IconButton sx={{ width: "max-content", color: "#fff" }}>
                  <Gear />
                </IconButton>
              </Box>
              :
              <IconButton onClick={() => { setSelected(3); navigate(getPath(3)) }} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}>
                <Gear />
              </IconButton>
            }
          </Stack>
        </Stack>

        {/* Avatar */}
        <Stack spacing={4}>
          {/* switch */}
          <AntSwitch defaultChecked onChange={onToggleMode} />
          <Avatar id="basic-button" aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} src={faker.image.avatar()} />
          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((ele, index) => (
                <MenuItem key={index} onClick={() => { handleClick(index) }}>
                  <Stack onClick={() => { navigate(getMenuPath(index)) }} sx={{ width: 100 }} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <span>{ele.title}</span>
                    {ele.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box >
  );
};

export default Sidebar