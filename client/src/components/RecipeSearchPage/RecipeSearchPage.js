import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import { Typography, Box } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import RecipeSearchForm from "./RecipeSearchForm";
import RecipeTable from "../../utils/RecipeTable";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const RecipeSearchPage = props => {
  const [recipes, setRecipes] = useState([]);

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

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Recipes</Typography>
          <RecipeSearchForm handleSearch={handleSearch}></RecipeSearchForm>
        </Box>
        <RecipeTable recipes={recipes}></RecipeTable>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(RecipeSearchPage);
