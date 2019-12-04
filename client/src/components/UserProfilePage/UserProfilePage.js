import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  CssBaseline,
  Container,
  Button,
  Avatar,
  Grid,
  Box,
  Typography
} from "@material-ui/core";
import styled from "styled-components";

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

const UserProfilePage = ({ location }) => {
  const [profileUser, setProfileUser] = useState(null);
  const [user] = useContext(UserContext);

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
    if (user !== null) {
      getProfileUser();
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
                  <Avatar
                    style={{ width: "150px", height: "150px", borderRadius: 0 }}
                    alt="profile pic"
                    src={profileUser.profilePictureUrl}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFriend}
                    style={{ marginTop: "10px" }}
                  >
                    {profileUser.isFriend ? "Unfriend" : "Add friend"}
                  </Button>
                </Box>
                <div align="left">
                    <Typography variant="h5">
                      {profileUser.firstName}, {profileUser.lastName}
                    </Typography>
                    <Typography variant="p">{profileUser.country}</Typography>
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
