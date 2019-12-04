import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  LocalDining as LocalDiningIcon,
  List as ListIcon,
  EmojiPeople as EmojiPeopleIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  Kitchen as KitchenIcon,
  Class as ClassIcon,
  PostAdd as PostAddIcon
} from "@material-ui/icons";
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
      <List>
        {[
          {
            label: "Search Recipes",
            icon: <KitchenIcon></KitchenIcon>,
            route: "/home"
          },
          {
            label: "Browse recipes by category",
            icon: <ClassIcon></ClassIcon>,
            route: "/category"
          },
          {
            label: "Add a new recipe",
            icon: <PostAddIcon></PostAddIcon>,
            route: "/new-recipe"
          },
          {
            label: "View my list",
            icon: <ListIcon></ListIcon>,
            route: `/list`
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
            dispatchToUser({ type: LOGOUT });
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon></ExitToAppIcon>
          </ListItemIcon>
          <ListItemText primary="Logout"></ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
