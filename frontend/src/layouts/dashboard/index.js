import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import { Gear } from "phosphor-react";
import React from "react";
import { Outlet } from "react-router-dom";
// this is the faker js library used to generate fake data
import { faker } from "@faker-js/faker"

import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../data";

import useSettings from "../../hooks/useSettings";

// const AntSwitch = styled(Switch)(({ theme }) => ({
//   width: 40,
//   height: 20,
//   padding: 0,
//   display: 'flex',
//   '&:active': {
//     '& .MuiSwitch-thumb': {
//       width: 15,
//     },
//     '& .MuiSwitch-switchBase.Mui-checked': {
//       transform: 'translateX(9px)',
//     },
//   },
//   '& .MuiSwitch-switchBase': {
//     padding: 2,
//     '&.Mui-checked': {
//       transform: 'translateX(20px)',
//       color: '#fff',
//       '& + .MuiSwitch-track': {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     transition: theme.transitions.create(['width'], {
//       duration: 200,
//     }),
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: 20 / 2,
//     opacity: 1,
//     backgroundColor:
//       theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
//     boxSizing: 'border-box',
//   },
// }));

const AntSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


const DashboardLayout = () => {

  const theme = useTheme();

  // this is the react costom hook used to manage the settings
  const { onToggleMode } = useSettings();

  // React hook used to manage the state of the selected button
  const [selected, setSelected] = React.useState(0);

  return (
    <Stack direction={"row"}>

      {/* metrial ui component */}
      <Box p={2} sx={{ backgroundColor: theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0 ,0 ,0 ,0.25)", height: "100vh", width: 100 }}>

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
                  <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }} p={1}>
                    <IconButton sx={{ width: "max-content", color: "#fff" }} key={el.index}> {el.icon} </IconButton>
                  </Box>
                  :
                  <IconButton onClick={() => setSelected(el.index)} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }} key={el.index}> {el.icon} </IconButton>

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
                <IconButton onClick={() => setSelected(3)} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}>
                  <Gear />
                </IconButton>
              }
            </Stack>
          </Stack>

          {/* Avatar */}
          <Stack spacing={4}>
            <AntSwitch defaultChecked onChange={() => { onToggleMode() }} />
            <Avatar src={faker.image.avatar()} />
          </Stack>

        </Stack>
      </Box>
      {/* the Outlet component is used to render the children of the parent route */}
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
