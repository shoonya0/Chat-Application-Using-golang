import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import StyledBadge from "./StyledBadge";



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
                                <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
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

export default ChatElement