import React from "react";
import { TableCell, TableRow, useTheme, TableHead } from "@material-ui/core";
import ResultList from "./ResultList";
import TableHeaderCell from "./TableHeaderCell";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const TableRowLink = styled(TableRow)`
  &:hover {
    cursor: pointer;
  }
`;

const RecipeTable = ({ recipes, history }) => {
  const { palette } = useTheme();
  const handleTableClick = recipeId => {
    history.push(`/recipes/${recipeId}`);
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
      <TableCell align="right">{recipe.overallRating ? (+recipe.overallRating).toPrecision(2) : "None"}</TableCell>
    </TableRowLink>
  );

  const renderTableHeader = () => (
    <React.Fragment>
      <colgroup>
        <col width="20%"></col>
        <col width="70%"></col>
        <col width="10%"></col>
      </colgroup>
      <TableHead>
        <TableRow>
          <TableHeaderCell palette={palette} align="right">
            Recipe Name
          </TableHeaderCell>
          <TableHeaderCell palette={palette} align="right">
            Description
          </TableHeaderCell>
          <TableHeaderCell palette={palette} align="right">
            Rating
          </TableHeaderCell>
        </TableRow>
      </TableHead>
    </React.Fragment>
  );

  return (
    <ResultList
      dataArr={recipes}
      renderTableRow={renderTableRow}
      renderTableHeader={renderTableHeader}
    ></ResultList>
  );
};

export default withRouter(RecipeTable);
