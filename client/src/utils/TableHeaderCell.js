import styled from "styled-components";
import { TableCell } from "@material-ui/core";

const TableHeaderCell = styled(TableCell)`
  background-color: ${({ palette }) => palette.primary.main} !important;
  color: ${({ palette }) => palette.common.white} !important;
`;

export default TableHeaderCell;
