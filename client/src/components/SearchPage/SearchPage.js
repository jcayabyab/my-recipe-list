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
import ResultList from "../../utils/ResultList";
import RecipeSearchForm from "./RecipeSearchForm";

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
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const SearchPage = props => {
  const [, dispatchToUser] = React.useContext(UserContext);
  const [incorrectPassword, setIncorrectPassword] = React.useState(false);
  const [userNameExists, setUserNameExists] = React.useState(false);

  const { palette } = useTheme();

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <RecipeSearchForm></RecipeSearchForm>
        <ResultList></ResultList>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(SearchPage);
