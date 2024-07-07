import { InputBase, styled } from "@mui/material";

// here StyledInputBase is a component which is made from InputBase and we have applied some css to it which provides us to write in
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    // "& .MuiInputBase-input": is used to apply css to the input field
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
    },
}));

export default StyledInputBase;