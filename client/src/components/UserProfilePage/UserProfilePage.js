import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  CssBaseline,
  Container,
  Button,
  Grid,
  Box,
  Typography,
  useTheme
} from "@material-ui/core";
import FriendsList from "./FriendsList";
import styled from "styled-components";
import ColoredAvatar from "../../utils/ColoredAvatar";
import RecipeTable from "../../utils/RecipeTable";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;

  & > * {
    margin: 0px 10px;
  }
`;

const UserProfilePage = ({ location, history }) => {
  const [profileUser, setProfileUser] = useState(null);
  const [profileRecipes, setProfileRecipes] = useState([]);
  const [user] = useContext(UserContext);

  const { palette } = useTheme();

  const getProfileUser = async () => {
    const userNameFromUrl = location.pathname.split("/").slice(-1)[0];

    const { data: theUser } = await axios.get("/api/profile", {
      params: {
        ownUserName: user.userName,
        userName: userNameFromUrl
      }
    });

    setProfileUser(theUser);
  };

  useEffect(() => {
    const getProfileRecipes = async () => {
      const userNameFromUrl = location.pathname.split("/").slice(-1)[0];

      const { data: recipes } = await axios.get("/api/recipes/search", {
        params: {
          userName: userNameFromUrl
        }
      });

      setProfileRecipes(recipes);
    };

    if (user !== null) {
      getProfileUser();
      getProfileRecipes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, location]);

  const handleFriend = () => {
    const userNameFromUrl = location.pathname.split("/").slice(-1)[0];

    axios.post(`/api/user/${profileUser.isFriend ? "un" : ""}friend`, {
      ownUserName: user.userName,
      userName: userNameFromUrl
    });

    getProfileUser();
  };

  const handleDelete = async () => {
    await axios.post("/api/user/delete", {
      userName: profileUser.userName
    });

    history.push("/profiles");
  };

  /*
  this is the data
  {
    firstName: String,
    lastName: String,
    country: String,
    isFriend: boolean,
    profilePictureUrl: String
  }
  
  */

  return profileUser ? (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <Body>
        <Row>
          <Grid container>
            <Grid item xs>
              <Row>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <ColoredAvatar
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: 0,
                      fontSize: "80px"
                    }}
                    alt="profile pic"
                    src={profileUser.profilePictureUrl}
                    color={palette.secondary.main}
                  >
                    {profileUser.firstName[0]}
                  </ColoredAvatar>
                  {user.userName !== profileUser.userName && (
                    <React.Fragment>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFriend}
                        style={{ marginTop: "10px" }}
                      >
                        {profileUser.isFriend ? "Unfriend" : "Add friend"}
                      </Button>
                      {user.isAdmin ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleDelete}
                          style={{ marginTop: "10px" }}
                        >
                          Delete User
                        </Button>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  )}
                  {user.userName === profileUser.userName && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/edit-profile")}
                      style={{ marginTop: "10px" }}
                    >
                      Edit Account
                    </Button>
                  )}
                </Box>
                <div>
                  <Typography variant="h5">
                    {profileUser.firstName} {profileUser.lastName}
                  </Typography>
                  <Typography variant="body1">{profileUser.country}</Typography>
                  <FriendsList friends={profileUser.friends}></FriendsList>
                  {profileRecipes.length !== 0 ? (
                    <React.Fragment>
                      <Typography variant="h5">Published recipes:</Typography>
                      <RecipeTable recipes={profileRecipes}></RecipeTable>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </Row>
            </Grid>
          </Grid>
        </Row>
      </Body>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default withRouter(UserProfilePage);
