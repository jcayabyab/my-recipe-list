import React, { useState, useEffect, useContext } from "react";
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
  IconButton,
  Tooltip,
  Box
} from "@material-ui/core";
import {
  RemoveCircle as RemoveCircleIcon,
  ExitToApp as ExitToAppIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import ResultList from "../../utils/ResultList";
import TableHeaderCell from "../../utils/TableHeaderCell";
import { UserContext } from "../../contexts/UserContext";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const TableRowOptions = styled(TableRow)`
  & > td > button {
    visibility: hidden;
    margin: 0px 7px;
  }
  &:hover {
    & > td > button {
      visibility: visible;
    }
  }
`;

const ListPage = ({ history }) => {
  const [list, setList] = useState({ recipes: [] });
  const [user] = useContext(UserContext);
  const { palette } = useTheme();

  useEffect(() => {
    const getLists = async () => {
      const { data: listData } = await axios.get("/api/list", {
        params: { userName: user.userName }
      });

      setList(listData);
    };
    if (user) {
      getLists();
    }
  }, [user, setList]);

  const handleEntryDelete = async recipeId => {
    setList({
      ...list,
      recipes: list.recipes.filter(recipe => recipeId !== recipe.recipeId)
    });

    axios.post("/api/list/remove", {
      userName: user.userName,
      recipeId
    });
  };

  const handleDecrement = async (recipeId, timesMade) => {
    if (timesMade <= 0) {
      return;
    }

    setList({
      ...list,
      recipes: list.recipes.map(recipe =>
        recipeId === recipe.recipeId
          ? { ...recipe, amountOfTimesMade: recipe.amountOfTimesMade - 1 }
          : recipe
      )
    });

    axios.post("/api/list/meal", {
      userName: user.userName,
      recipeId,
      increment: false
    });
  };

  const handleIncrement = async (recipeId, timesMade) => {
    setList({
      ...list,
      recipes: list.recipes.map(recipe =>
        recipeId === recipe.recipeId
          ? { ...recipe, amountOfTimesMade: recipe.amountOfTimesMade + 1 }
          : recipe
      )
    });
    axios.post("/api/list/meal", {
      userName: user.userName,
      recipeId,
      increment: true
    });
  };

  // this should be iterable
  const renderTableRow = ({
    recipeId,
    name,
    description,
    amountOfTimesMade
  }) => (
    <TableRowOptions hover role="checkbox" tabIndex={-1} key={recipeId}>
      <TableCell>
        <Box display="flex">
          <Tooltip title="Remove recipe from list">
            <IconButton onClick={() => handleEntryDelete(recipeId)}>
              <RemoveCircleIcon></RemoveCircleIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Go to recipe page">
            <IconButton onClick={() => history.push("/recipes/" + recipeId)}>
              <ExitToAppIcon></ExitToAppIcon>
            </IconButton>
          </Tooltip>
          <Box marginLeft="5px">{name}</Box>
        </Box>
      </TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell size="small" align="right">
        <Tooltip title="Undo meal making">
          <IconButton
            onClick={() => handleDecrement(recipeId, amountOfTimesMade)}
          >
            <RemoveIcon></RemoveIcon>
          </IconButton>
        </Tooltip>
        {amountOfTimesMade}
        <Tooltip title="Make this meal!">
          <IconButton
            onClick={() => handleIncrement(recipeId, amountOfTimesMade)}
          >
            <AddIcon></AddIcon>
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRowOptions>
  );

  const renderTableHeader = () => (
    <React.Fragment>
      <colgroup>
        <col width="20%"></col>
        <col width="65%"></col>
        <col width="15%"></col>
      </colgroup>
      <TableHead>
        <TableRow>
          <TableHeaderCell palette={palette}>Recipe Name</TableHeaderCell>
          <TableHeaderCell palette={palette} align="right">
            Description
          </TableHeaderCell>
          <TableHeaderCell palette={palette} align="right">
            Times Made
          </TableHeaderCell>
        </TableRow>
      </TableHead>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <Typography variant="h4">{list.listName}</Typography>
        <ResultList
          dataArr={list.recipes}
          renderTableRow={renderTableRow}
          renderTableHeader={renderTableHeader}
        ></ResultList>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(ListPage);
