import React from "react";
import { Table } from "@material-ui/core";
import styled from 'styled-components';

const WideTable = styled(Table)`
  min-width: 650px;
`

// should accept a bunch of TableCell components mapped as children
const ResultList = () => {
  return <WideTable>ResultList</WideTable>;
};

export default ResultList;
