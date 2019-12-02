import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import { useTheme, TableHead, TableCell, TableRow } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ResultList from "../../utils/ResultList";
import RecipeSearchForm from "./RecipeSearchForm";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const CategoriesPage = props => {
  const [categories, setCategories] = useState([]);
  const { palette } = useTheme();

  useEffect(() => {
    const getAllRecipes = async () => {
      const { data: categories } = await axios.get("/api/categories");
      setCategories(categories);
    };
    getAllRecipes();
  }, [setCategories]);

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
        <TableCell align="right">Recipe Name</TableCell>
        <TableCell align="right">Description</TableCell>
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
          dataArr={categories}
          renderTableRow={renderTableRow}
          renderTableHeader={renderTableHeader}
        ></ResultList>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(CategoriesPage);
