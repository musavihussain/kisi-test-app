import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Lock from "./components/Lock";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Montserrat",
      textTransform: "none",
      fontSize: 16,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="locks/:group" element={<Lock />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
