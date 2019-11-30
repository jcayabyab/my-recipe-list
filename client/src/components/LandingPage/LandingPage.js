import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import { useTheme } from "@material-ui/core";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { LOGIN } from "../../contexts/types";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";

const Header = styled.div`
  background-color: ${({ palette }) => palette.primary.main};
  padding: 70px 0px;
  text-align: center;
  font-family: "Raleway", Roboto, Arial;
  font-weight: bold;
  color: white;
  border-bottom: ${({ palette }) => palette.secondary.main} 20px solid;
`;

const Title = styled.div`
  font-size: 60px;
`;

const Subtitle = styled.div`
  font-size: 30px;
`;

const Body = styled(Container)`
  padding: 20px 0px;
`;

const FormsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const FormField = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const LandingPage = props => {
  const [, dispatchToUser] = React.useContext(UserContext);
  const [incorrectPassword, setIncorrectPassword] = React.useState(false);
  const [userNameExists, setUserNameExists] = React.useState(false);

  const handleLogin = async (userName, password) => {
    try {
      const res = await axios.get("/api/login", {
        params: { username: userName, password }
      });
      dispatchToUser({ type: LOGIN, payload: res.data });
      props.history.push("/home");
    } catch (err) {
      console.log(err.response.status);
      if ((err.response.status = "401")) {
        setIncorrectPassword(true);
      }
    }
  };

  const handleRegister = async (
    userName,
    password,
    firstName,
    lastName,
    country,
    profilePictureUrl
  ) => {
    try {
      const res = await axios.post("/api/login/create", {
        userName,
        password,
        firstName,
        lastName,
        country,
        profilePictureUrl
      });

      dispatchToUser({ type: LOGIN, payload: res.data });
      props.history.push("/home");
    } catch (err) {
      console.log(err.response.status);
      if ((err.response.status = "403")) {
        setUserNameExists(true);
      }
    }
  };

  const { palette } = useTheme();

  return (
    <React.Fragment>
      <CssBaseline />
      <Header palette={palette}>
        <Title>MyRecipeList</Title>
        <Subtitle>Discover and save your new favourite recipe!</Subtitle>
      </Header>
      <Body>
        <FormsWrapper>
          <FormField>
            <h1>Login to an existing account:</h1>
            <LoginForm
              incorrect={incorrectPassword}
              handleLogin={handleLogin}
            ></LoginForm>
          </FormField>
          <div
            style={{
              width: "6px",
              backgroundColor: palette.secondary.main,
              alignSelf: "stretch"
            }}
          ></div>
          <FormField>
            <h1>Create a new account:</h1>
            <RegisterForm
              usernameExists={userNameExists}
              handleRegister={handleRegister}
            ></RegisterForm>
          </FormField>
        </FormsWrapper>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(LandingPage);
