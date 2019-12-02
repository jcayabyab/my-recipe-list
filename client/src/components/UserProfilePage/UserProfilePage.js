import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import axios from "axios";

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

  return profileUser ? (
    <div>{profileUser.firstName}</div>
  ) : (
    <div>Loading...</div>
  );
};

export default withRouter(UserProfilePage);
