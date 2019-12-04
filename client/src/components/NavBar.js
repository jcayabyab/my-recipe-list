import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import SideDrawer from "./SideDrawer";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NoDecorLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const NavBar = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [user] = useContext(UserContext);

  return (
    <React.Fragment>
      <AppBar position="sticky" color="primary">
        <Toolbar style={{ justifyContent: "flex-end" }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <NoDecorLink to="/home">MyRecipeList.com</NoDecorLink>
          </Typography>
          <Typography variant="body1">
            {user && `Hello, ${user.firstName || user.userName}`}
          </Typography>
          <IconButton onClick={() => setDrawerIsOpen(true)} color="inherit">
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <SideDrawer
          open={drawerIsOpen}
          setDrawerIsOpen={setDrawerIsOpen}
        ></SideDrawer>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;
