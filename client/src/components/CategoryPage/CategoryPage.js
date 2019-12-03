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
  Paper
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ResultList from "../../utils/ResultList";
import TableHeaderCell from "../TableHeaderCell";

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
  background-image: url("${({ pictureUrl }) => pictureUrl}");
  background-size: cover;
  background-position: center;
  color: white;
  letter-spacing: 0.05em;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;

const TableRowLink = styled(TableRow)`
  &:hover {
    cursor: pointer;
  }
`;

const CategoryPage = ({ location, history }) => {
  const [category, setCategory] = useState({ recipes: [] });
  const { palette } = useTheme();

  useEffect(() => {
    const getCategoryRecipes = async () => {
      const categoryFromUrl = location.pathname.split("/").slice(-1)[0];

      const { data: categoryData } = await axios.get("/api/category/", {
        params: { categoryName: categoryFromUrl }
      });

      setCategory(categoryData);
    };
    getCategoryRecipes();
  }, [setCategory, location.pathname]);

  const handleTableClick = recipeId => {
    history.push(`/recipes/${recipeId}`);
  };

  console.log(category);

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
        <TableHeaderCell palette={palette} align="right">
          Recipe Name
        </TableHeaderCell>
        <TableHeaderCell palette={palette} align="right">
          Description
        </TableHeaderCell>
      </TableRow>
    </TableHead>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <Banner pictureUrl={category.pictureUrl}>
          <Typography variant="h3" component="h3" style={{ color: "white" }}>
            {category.categoryName}
          </Typography>
        </Banner>
        <ResultList
          dataArr={category.recipes}
          renderTableRow={renderTableRow}
          renderTableHeader={renderTableHeader}
        ></ResultList>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(CategoryPage);
