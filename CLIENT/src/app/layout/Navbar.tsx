import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";

const middleLink = [
  {
    title: "catalog",
    path: "/catalog",
  },
  {
    title: "about",
    path: "/about",
  },
  {
    title: "contact",
    path: "/contact",
  },
  {
    title: "dummy",
    path: "/dummy",
  },
];

const rightLink = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Register",
    path: "/register",
  },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "#baecf9",
  },
};

type DarkModeProps = {
  darkUI: () => void;
  darkMode: boolean;
};

export default function Navbar({ darkUI, darkMode }: DarkModeProps) {
  // const darkMode = true;
  const { isLoading } = useAppSelector((state) => state.uiSlice);

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            Welcome to our shop
          </Typography>
          <IconButton onClick={darkUI}>
            {darkMode ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>

        <List sx={{ display: "flex" }}>
          {middleLink.map(({ title, path }, index) => (
            <ListItem key={index} component={NavLink} to={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            component={Link}
            to="/cart"
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent="4" color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {rightLink.map(({ title, path }, index) => (
              <ListItem
                key={index}
                component={NavLink}
                to={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </AppBar>
  );
}
