import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import { useTheme } from "@material-ui/core";
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

const fakeData = [
  { name: "Tim", age: 40, country: "Canada" },
  { name: "Brett", age: 35, country: "Canada" },
  { name: "Mandingo", age: 50, country: "United States" },
  { name: "Tom", age: 50, country: "United States" },
  { name: "Flim", age: 50, country: "United States" },
  { name: "Flam", age: 50, country: "United States" },
  { name: "Navjot", age: 50, country: "United States" },
  { name: "Minji", age: 50, country: "United States" },
  { name: "Jofred", age: 50, country: "United States" },
  { name: "Tyler Lam", age: 50, country: "United States" },
  { name: "Barack", age: 50, country: "United States" },
  { name: "Pam", age: 40, country: "Zimbabwe" }
];

const SearchPage = props => {
  const { palette } = useTheme();

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <RecipeSearchForm></RecipeSearchForm>
        <ResultList dataArr={fakeData} dataKey="name"></ResultList>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(SearchPage);
