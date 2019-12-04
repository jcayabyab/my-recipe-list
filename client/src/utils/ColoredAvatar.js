import styled from "styled-components";
import { Avatar } from "@material-ui/core";

export default styled(Avatar)`
  color: #fff !important;
  background-color: ${({ color }) => color} !important;
`;
