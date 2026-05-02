import { useState } from "react";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Switch function
  const darkUI = () => {
    setDarkMode((prevState) => !prevState);
  };

  // const darkMode = true;
  const palleteType = darkMode ? "dark" : "light";
  // Theme
  const darkTheme = createTheme({
    palette: {
      mode: palleteType,
      background: { default: palleteType === "light" ? "#eaeaea" : "#393939" },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ScrollRestoration />
      <Navbar darkUI={darkUI} darkMode={darkMode} />
      <Box
        sx={{
          minHeight: 300,
          background: darkMode ? "#393939" : "#eaeaea",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 15 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
