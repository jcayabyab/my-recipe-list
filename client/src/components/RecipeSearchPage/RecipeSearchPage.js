import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import { useTheme, TableHead, TableCell, TableRow } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ResultList from "../../utils/ResultList";
import RecipeSearchForm from "./RecipeSearchForm";
import TableHeaderCell from "../TableHeaderCell";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const TableRowLink = styled(TableRow)`
  &:hover {
    cursor: pointer;
  }
`;

const SearchPage = props => {
  const [recipes, setRecipes] = useState([]);
  const { palette } = useTheme();

  useEffect(() => {
    const getAllRecipes = async () => {
      const { data: recipes } = await axios.get("/api/recipes");
      console.log(recipes);
      setRecipes(recipes);
    };
    getAllRecipes();
  }, [setRecipes]);

  const handleSearch = async (recipeName, ingredients, kitchenItems) => {
    const { data: recipes } = await axios.post("/api/recipes/search", {
      recipeName,
      ingredients: [],
      kitchenItems: []
    });

    console.log(recipes);
    setRecipes(recipes);
  };

  const handleTableClick = recipeId => {
    props.history.push(`/recipes/${recipeId}`);
  };

  // this should be iterable
  const renderTableRow = recipe => (
    <TableRowLink
      hover
      onClick={() => handleTableClick(recipe.recipeId)}
      role="checkbox"
      tabIndex={-1}
      key={recipe.recipeId}
    >
      <TableCell align="right">{recipe.name}</TableCell>
      <TableCell align="right">{recipe.description}</TableCell>
    </TableRowLink>
  );

  const renderTableHeader = () => (
    <TableHead>
      <TableRow>
        <TableHeaderCell palette={palette} align="right">Recipe Name</TableHeaderCell>
        <TableHeaderCell palette={palette} align="right">Description</TableHeaderCell>
      </TableRow>
    </TableHead>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <RecipeSearchForm handleSearch={handleSearch}></RecipeSearchForm>
        {/* <ResultListAuto dataArr={fakeData} dataKey="name"></ResultListAuto> */}
        <ResultList
          dataArr={recipes}
          renderTableRow={renderTableRow}
          renderTableHeader={renderTableHeader}
        ></ResultList>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(SearchPage);
