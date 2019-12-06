import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import {
  Typography,
  Paper
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import RecipeTable from "../../utils/RecipeTable";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const Banner = styled(Paper)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 150px;
  padding: 20px;
  margin-bottom: 10px;
  background-image: url("${({ url }) => url}");
  background-size: cover;
  background-position: center;
  color: white;
  letter-spacing: 0.05em;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;

const CategoryPage = ({ location, history }) => {
  const [category, setCategory] = useState({ recipes: [] });

  useEffect(() => {
    const getCategoryRecipes = async () => {
      const categoryFromUrl = location.pathname
        .split("/")
        .slice(-1)[0]
        .replace("-", " ");

      const { data: categoryData } = await axios.get("/api/category", {
        params: { categoryName: categoryFromUrl }
      });

      setCategory(categoryData);
    };
    getCategoryRecipes();
  }, [setCategory, location.pathname]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <Banner url={category.pictureUrl}>
          <Typography variant="h3" component="h3" style={{ color: "white" }}>
            {category.categoryName}
          </Typography>
        </Banner>
        <RecipeTable
          recipes={category.recipes}
        ></RecipeTable>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(CategoryPage);
