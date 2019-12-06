import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { LOGIN } from "../../contexts/types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import EditAccountForm from "./EditAccountForm";
import axios from "axios";
import { Typography, Paper } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const EditAccountPage = ({ history }) => {
  const [user, dispatchToUser] = useContext(UserContext);

  const handleAccountChange = async (
    userName,
    firstName,
    lastName,
    country,
    profilePictureUrl
  ) => {
    try {
      await axios.post("/api/user/update", {
        userName,
        firstName,
        lastName,
        country,
        profilePictureUrl
      });

      const updatedUser = {
        ...user,
        firstName,
        lastName,
        country,
        profilePictureUrl
      };

      dispatchToUser({ type: LOGIN, payload: updatedUser });

      history.push(`/user/${user.userName}`);
    } catch (err) {
      if ((err.response.status = "404")) {
        console.log(err.response.status);
      }
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Paper style={{ padding: "20px 20px 40px" }}>
          <Typography variant="h4">Edit Account Information</Typography>
          <EditAccountForm
            user={user}
            handleAccountChange={handleAccountChange}
          ></EditAccountForm>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(EditAccountPage);
