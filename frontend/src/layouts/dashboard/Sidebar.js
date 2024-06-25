import React from 'react'
import { Avatar, Box, Divider, IconButton, Stack } from '@mui/material'
import useSettings from "../../hooks/useSettings";
import { useTheme } from '@mui/material/styles';
import { Nav_Buttons } from "../../data";
import { Gear } from 'phosphor-react';
import AntSwitch from '../../components/AntSwitch';
import Logo from "../../assets/Images/logo.ico";


// this is the faker js library used to generate fake data
import { faker } from "@faker-js/faker"


const Sidebar = () => {
    const theme = useTheme();

    // React hook used to manage the state of the selected button
    const [selected, setSelected] = React.useState(0);

    // this is the react costom hook used to manage the settings
    const { onToggleMode } = useSettings();


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
        </Box >
    );
};

export default Sidebar