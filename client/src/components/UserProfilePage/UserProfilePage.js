import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  CssBaseline,
  Container,
  Avatar,
  Box,
  Typography,
  Button
} from "@material-ui/core";
import styled from "styled-components";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const BigAvatar = styled(Avatar)`
  width: 250px !important;
  height: 250px !important;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    margin: 0px 10px;
  }
`;

const UserProfilePage = ({ location }) => {
  const [profileUser, setProfileUser] = useState(null);
  const [user] = useContext(UserContext);

  useEffect(() => {
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

    if (user !== null) {
      getProfileUser();
    }
  }, [user, location]);

  console.log(profileUser);

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
          <BigAvatar
            alt="bunny"
            src={profileUser.profilePictureUrl}
          ></BigAvatar>
          <h6>{profileUser.country}</h6>
          <Button variant="contained" color="primary">Press me please</Button>
        </Row>
      </Body>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default withRouter(UserProfilePage);
