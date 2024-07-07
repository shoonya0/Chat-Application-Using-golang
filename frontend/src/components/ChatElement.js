import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { faker } from "@faker-js/faker";

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

export default ChatElement