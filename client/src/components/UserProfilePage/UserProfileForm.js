import React from "react";
import { TextField, Button, FormHelperText, Box } from "@material-ui/core";
import styled from "styled-components";
import { useTheme } from "@material-ui/core";


const FriendRequestButton = styled(Button)`
  margin: 0px 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

export default UserProfileForm;