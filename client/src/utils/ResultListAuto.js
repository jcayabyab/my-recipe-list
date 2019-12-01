import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TablePagination,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from "@material-ui/core";
import styled from "styled-components";

const Root = styled(Paper)`
  width: 100%;
`;

const WideTable = styled(Table)`
  min-width: 650px;
`;

const TableWrapper = styled.div`
  max-height: 587px;
  overflow: auto;
`;

// should accept an array of objects containing relevant data
// objects should have same structure
const ResultListAuto = ({ dataArr, dataKey }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getCurrentPageRows = () =>
    dataArr.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const renderDataInRows = () =>
    getCurrentPageRows().map(row => (
      <TableRow hover role="checkbox" tabIndex={-1} key={row[dataKey]}>
        {Object.keys(row).map(key => (
          <TableCell key={row[key]} align="right">
            {row[key]}
          </TableCell>
        ))}
      </TableRow>
    ));

  return (
    <Root>
      <TableWrapper>
        <WideTable stickyHeader>
          <TableHead>
            <TableRow>
              {Object.keys(dataArr[0]).map(key => (
                <TableCell key={key} align="right">
                  {key}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderDataInRows()}</TableBody>
        </WideTable>
      </TableWrapper>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={dataArr.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      ></TablePagination>
    </Root>
  );
};

ResultListAuto.propTypes = {
  dataArr: PropTypes.arrayOf(PropTypes.object),
  dataKey: PropTypes.string
};

export default ResultListAuto;
