import React from 'react'
import { Box, Divider, Stack, Typography, Link, IconButton, Menu, MenuItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DotsThreeVertical, DownloadSimple, Image } from 'phosphor-react';
import { Message_options } from '../../data';

// the text will come from props by destructuring the props
const TimeLine = ({ ele }) => {
	const theme = useTheme();
	return (
		<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
			<Divider width="46%" />
			<Typography variant="caption" sx={{ color: theme.palette.text }}>{ele.text}</Typography>
			<Divider width="46%" />
		</Stack>
	);
};


const MessageOptions = () => {

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<DotsThreeVertical size={20}
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			/>
			<Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
				<Stack spacing={1} px={1}>
					{Message_options.map((ele, index) => (
						<MenuItem key={index} onClick={handleClick}>{ele.title}</MenuItem>
					))}
				</Stack>
			</Menu>
		</>
	);
};

// the numerical value of material ui x * 8 = 8x px
// the text will come from props by destructuring the props
const TextMessage = ({ ele, menu }) => {
	const theme = useTheme();
	return (
		<Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
			<Box p={1.5} sx={{ backgroundColor: ele.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5, width: "max-content", }}>
				<Typography variant="body2" color={ele.incoming ? theme.palette.text : "#fff"}>
					{ele.message}
				</Typography>
			</Box>
			{menu && <MessageOptions />}
		</Stack>
	)
}

// used to send images
const MediaMessage = ({ ele, menu }) => {
	const theme = useTheme();
	return (
		<Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
			<Box p={1.5} sx={{ backgroundColor: ele.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5, width: "max-content", }}>
				<Stack spacing={1}>
					<img src={ele.img} alt={ele.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
				</Stack>
				<Typography variant="body2" color={ele.incoming ? theme.palette.text : "#fff"} >
					{ele.message}
				</Typography>
			</Box>
			{menu && <MessageOptions />}
		</Stack >
	);
};


const ReplyMsg = ({ ele, menu }) => {
	const theme = useTheme();
	return (
		<Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
			<Box p={1.5} sx={{ backgroundColor: ele.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5, width: "max-content", }}>
				{/* for an choosen reply*/}
				<Stack spacing={2}>
					{/* to render original message */}
					<Stack p={2} direction={"column"} spacing={3} alignItems={"center"} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
						<Typography variant="body2" color={theme.palette.text}> {ele.message} </Typography>
					</Stack>
					<Typography variant="body2" color={ele.incoming ? theme.palette.text : "#fff"}> {ele.reply} </Typography>
				</Stack>
			</Box>
			{menu && <MessageOptions />}
		</Stack>
	)
}

const LinkMsg = ({ ele, menu }) => {
	const theme = useTheme();
	return (
		<Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
			<Box p={1.5} sx={{ backgroundColor: ele.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5, width: "max-content", }}>
				<Stack spacing={2}>
					<Stack p={2} spacing={3} alignItems={"start"} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
						<img src={ele.preview} alt={ele.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
						{/* this contain title of the link and url */}
						<Stack spacing={2}>
							<Typography variant="subtitle2">This is armerica</Typography>
							<Typography variant="subtitle2" component={Link} sx={{ color: theme.palette.primary.main }} to="//https://www.google.com">www.google.com</Typography>
						</Stack>
						{/* message in case send with link */}
						<Typography variant="body2" color={ele.incoming ? theme.palette.text : "#fff"}>{ele.message}</Typography>
					</Stack>
				</Stack>
			</Box>
			{menu && <MessageOptions />}
		</Stack>
	)
}

const DocMsg = ({ ele, menu }) => {
	const theme = useTheme();
	return (
		<Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
			<Box p={1.5} sx={{ backgroundColor: ele.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5, width: "max-content", }}>
				<Stack spacing={2}>
					<Stack p={2} direction={"row"} spacing={3} alignItems={"center"} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
						<Image size={48} />
						<Typography variant="caption">img.png</Typography>
						<IconButton>
							<DownloadSimple />
						</IconButton>
					</Stack>
					{/* for rendering message */}
					<Typography variant="body2" sx={{ color: ele.incoming ? theme.palette.text : "#fff" }}>{ele.message}</Typography>
				</Stack>
			</Box>
			{menu && <MessageOptions />}
		</Stack>
	)
}


export { TimeLine, TextMessage, MediaMessage, ReplyMsg, LinkMsg, DocMsg }