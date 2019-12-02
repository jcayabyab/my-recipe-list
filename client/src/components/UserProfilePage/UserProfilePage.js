import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { CssBaseline, Container, Avatar } from "@material-ui/core";
import styled from "styled-components";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const BigAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
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
      <Body>{profileUser.country}</Body>
      <BigAvatar
        alt="bunny"
        src="https://thumbs-prod.si-cdn.com/PT-enupw3YGzvb_SHpFOxkWUI_M=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/70/e0/70e0989e-646e-4537-ae8e-7bbf863db2fd/ebjj1g.jpg"
      ></BigAvatar>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default withRouter(UserProfilePage);
