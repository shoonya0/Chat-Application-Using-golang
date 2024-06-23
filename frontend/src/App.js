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
        <Box >
          <Router />
        </Box>
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
