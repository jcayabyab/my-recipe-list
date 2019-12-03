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
  Box,
  Typography
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ResultList from "../../utils/ResultList";
import UserSearchForm from "./UserSearchForm";

const StyledTableHeaderCell = styled(TableCell)`
  background-color: ${({ palette }) => palette.primary.main} !important;
  color: ${({ palette }) => palette.common.white} !important;
`;

const Body = styled(Container)`
  padding: 20px 0px;
`;

const TableRowLink = styled(TableRow)`
  &:hover {
    cursor: pointer;
  }
`;

const SearchPage = props => {
  const [users, setUsers] = useState([]);
  const { palette } = useTheme();

  const handleSearch = async searchTerm => {
    const { data: users } = await axios.get("/api/profiles", {
      params: { searchTerm }
    });
    console.log(users);
    setUsers(users);
  };

  useEffect(() => {
    handleSearch("");
  }, [setUsers]);

  const handleTableClick = username => {
    props.history.push(`/user/${username}`);
  };

  // this should be iterable
  const renderTableRow = user => (
    <TableRowLink
      hover
      onClick={() => handleTableClick(user.userName)}
      role="checkbox"
      tabIndex={-1}
      key={user.userName}
    >
      <TableCell align="right">{user.userName}</TableCell>
      <TableCell align="right">
        {user.firstName + " " + user.lastName}
      </TableCell>
      <TableCell align="right">{user.country}</TableCell>
    </TableRowLink>
  );

  const renderTableHeader = () => (
    <TableHead color="primary">
      <TableRow>
        <StyledTableHeaderCell palette={palette} align="right">
          Username
        </StyledTableHeaderCell>
        <StyledTableHeaderCell palette={palette} align="right">
          Name
        </StyledTableHeaderCell>
        <StyledTableHeaderCell palette={palette} align="right">
          Country
        </StyledTableHeaderCell>
      </TableRow>
    </TableHead>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Users</Typography>
          <UserSearchForm handleSearch={handleSearch}></UserSearchForm>
        </Box>
        <ResultList
          dataArr={users}
          renderTableRow={renderTableRow}
          renderTableHeader={renderTableHeader}
        ></ResultList>
      </Body>
    </React.Fragment>
  );
};

export default withRouter(SearchPage);
