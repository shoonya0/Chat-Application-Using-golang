import styled from "@mui/material/styles/styled";

// here SearchIconWrapper is a component which is made from div and we have applied some css to it
const SearchIconWrapper = styled("div")(({ theme }) => ({
    // here theme.spacing(0 ,2) is used to give padding to the component from top and bottom
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

export default SearchIconWrapper;