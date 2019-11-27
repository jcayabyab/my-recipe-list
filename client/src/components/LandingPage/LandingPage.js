import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useTheme } from "@material-ui/core";
import LoginForm from "./LoginForm";

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

const LoginField = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const LandingPage = () => {

  const { palette } = useTheme();

  return (
    <React.Fragment>
      <CssBaseline />
      <Header palette={palette}>
        <Title>MyRecipeList</Title>
        <Subtitle>Discover and save your new favourite recipe!</Subtitle>
      </Header>
      <Body>
        <LoginField>
          <LoginForm></LoginForm>
          <div>
            <small>
              {/* // TODO: change to Route tag*/}
              Not a registered user? Sign up <a href="/">here</a>.
            </small>
          </div>
        </LoginField>
      </Body>
    </React.Fragment>
  );
};

export default LandingPage;
