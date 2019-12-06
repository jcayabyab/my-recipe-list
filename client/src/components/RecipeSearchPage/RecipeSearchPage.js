import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import {
  useTheme,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Box
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ResultList from "../../utils/ResultList";
import RecipeSearchForm from "./RecipeSearchForm";
import TableHeaderCell from "../../utils/TableHeaderCell";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const TableRowLink = styled(TableRow)`
  &:hover {
    cursor: pointer;
  }
`;

const RecipeSearchPage = props => {
  const [recipes, setRecipes] = useState([]);
  const { palette } = useTheme();

  useEffect(() => {
    const getAllRecipes = async () => {
      const { data: recipes } = await axios.get("/api/recipes");
      setRecipes(recipes);
    };
    getAllRecipes();
  }, [setRecipes]);

  const handleSearch = async (recipeName, ingredients, kitchenItems) => {
    const { data: recipes } = await axios.post("/api/recipes/search", {
      searchQuery: recipeName,
      ingredients,
      kitchenItems
    });

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
    <React.Fragment>
      <colgroup>
        <col width="20%"></col>
        <col width="80%"></col>
      </colgroup>
      <TableHead>
        <TableRow>
          <TableHeaderCell palette={palette} align="right">
            Recipe Name
          </TableHeaderCell>
          <TableHeaderCell palette={palette} align="right">
            Description
          </TableHeaderCell>
        </TableRow>
      </TableHead>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Recipes</Typography>
          <RecipeSearchForm handleSearch={handleSearch}></RecipeSearchForm>
        </Box>
        <ResultList
          dataArr={recipes}
          renderTableRow={renderTableRow}
          renderTableHeader={renderTableHeader}
        ></ResultList>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(RecipeSearchPage);
