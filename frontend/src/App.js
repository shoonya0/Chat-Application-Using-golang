// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import { Box } from "@mui/material";

function App() {
  return (
    <ThemeProvider>
      <ThemeSettings>
        <Box style={{ display: "flex" }}>
          <Router />
        </Box>
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
