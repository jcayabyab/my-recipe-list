import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TablePagination,
  TableBody,
  Paper,
  TableCell,
  TableRow
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

const ResultList = ({ dataArr, renderTableRow, renderTableHeader }) => {
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
    dataArr.length === 0 ? (
      <TableRow>
        <TableCell colspan="3">No entries in this table yet!</TableCell>
      </TableRow>
    ) : (
      getCurrentPageRows().map(renderTableRow)
    );

  return (
    <Root>
      <TableWrapper>
        <WideTable stickyHeader>
          {renderTableHeader()}
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

ResultList.propTypes = {
  dataArr: PropTypes.arrayOf(PropTypes.object),
  dataKey: PropTypes.string
};

export default ResultList;
