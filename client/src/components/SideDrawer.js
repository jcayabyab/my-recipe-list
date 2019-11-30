import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import ListIcon from "@material-ui/icons/List";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import KitchenIcon from "@material-ui/icons/Kitchen";
import { Link } from "react-router-dom";

import { LOGOUT } from "../contexts/types";

const SideDrawer = ({ open, setDrawerIsOpen }) => {
  const [user, dispatchToUser] = useContext(UserContext);

  const userName = user ? user.userName : "placeholder";

  return (
    <Drawer
      anchor="right"
      open={open}
      onKeyDown={() => setDrawerIsOpen(false)}
      onClick={() => setDrawerIsOpen(false)}
    >
      <div>
        <List>
          {[
            {
              label: "Search Recipes",
              icon: <KitchenIcon></KitchenIcon>,
              route: "/home"
            },
            {
              label: "View my list",
              icon: <ListIcon></ListIcon>,
              route: `/profiles/${userName}/list`
            },
            {
              label: "View kitchen items",
              icon: <LocalDiningIcon></LocalDiningIcon>,
              route: "/items"
            },
            {
              label: "Search profiles",
              icon: <EmojiPeopleIcon></EmojiPeopleIcon>,
              route: "/profiles"
            },
            {
              label: "My Account",
              icon: <AccountCircleIcon></AccountCircleIcon>,
              route: `/profiles/${userName}`
            }
          ].map(entry => (
            <Link
              to={entry.route}
              key={entry.label}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemIcon>{entry.icon}</ListItemIcon>
                <ListItemText primary={entry.label}></ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider></Divider>
        <List>
          <ListItem
            button
            onClick={() => {
              console.log("Here");
              dispatchToUser({ type: LOGOUT });
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon></ExitToAppIcon>
            </ListItemIcon>
            <ListItemText primary="Logout"></ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
