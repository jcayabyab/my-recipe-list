import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import { useTheme, TableHead, TableCell, TableRow } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ResultList from "../../utils/ResultList";
import UserSearchForm from "./UserSearchForm";

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
    props.history.push(`/profiles/${username}`);
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
    <TableHead>
      <TableRow>
        <TableCell align="right">Username</TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Country</TableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <UserSearchForm handleSearch={handleSearch}></UserSearchForm>
        {/* <ResultListAuto dataArr={fakeData} dataKey="name"></ResultListAuto> */}
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
