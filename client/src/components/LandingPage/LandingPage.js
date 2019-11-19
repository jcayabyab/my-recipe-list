import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import axios from "axios";

const Header = styled.div`
  background-color: #00bfd8;
  padding: 70px 0px;
  text-align: center;
  font-family: "Raleway", Roboto, Arial;
  font-weight: bold;
  color: white;
  border-bottom: #ff6363 20px solid;
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

  const testFunc = async () => {
    const result = await axios.get("/api/test");
    console.log(result.data.result);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header>
        <Title>MyRecipeList</Title>
        <Subtitle>Discover and save your new favourite recipe!</Subtitle>
      </Header>
      <Body>
        <LoginField>
          Insert form here
          <Button
            style={{ margin: "0px 10px" }}
            color="primary"
            variant="contained"
            onClick={() => testFunc()}
          >
            Login
          </Button>
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
