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

const fakeData = [
  {
    userName: "mike",
    firstName: "Mike",
    lastName: "Oxlong",
    country: "Canada",
    profilePictureUrl: ""
  },
  {
    userName: "jenna",
    firstName: "Jenna",
    lastName: "Tillius",
    country: "Canada",
    profilePictureUrl: ""
  },
  {
    userName: "gabe",
    firstName: "Gabe",
    lastName: "Itches",
    country: "Canada",
    profilePictureUrl: ""
  },
  {
    userName: "hugh",
    firstName: "Hugh",
    lastName: "Mungus",
    country: "Canada",
    profilePictureUrl: ""
  },
  {
    userName: "anita",
    firstName: "Anita",
    lastName: "Blackhawk",
    country: "Canada",
    profilePictureUrl: ""
  }
];

const SearchPage = props => {
  const [users, setUsers] = useState([]);
  const { palette } = useTheme();

  useEffect(() => {
    setUsers(fakeData);
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
      <TableCell align="right">{user.firstName}</TableCell>
      <TableCell align="right">{user.lastName}</TableCell>
      <TableCell align="right">{user.country}</TableCell>
    </TableRowLink>
  );

  const renderTableHeader = () => (
    <TableHead>
      <TableRow>
        <TableCell align="right">Username</TableCell>
        <TableCell align="right">First Name</TableCell>
        <TableCell align="right">Last Name</TableCell>
        <TableCell align="right">Country</TableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Body>
        <UserSearchForm></UserSearchForm>
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
