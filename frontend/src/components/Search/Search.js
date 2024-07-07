import { styled, alpha } from "@mui/material";

// here Search is act as container which is made from div and we have applied some css to it
const Search = styled("div")(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.default, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
}));

export default Search;