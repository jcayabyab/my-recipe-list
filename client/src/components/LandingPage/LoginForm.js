import React from "react";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { LOGIN } from "../../contexts/types";

const LoginButton = styled(Button)`
  margin: 0px 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & > * {
    margin: 10px 0px !important;
  }
`;

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { state, dispatch } = React.useContext(UserContext);

  const handleLogin = async e => {
    e.preventDefault();
    console.log(username, password);
    // fake backend route
    dispatch({
      type: LOGIN,
      payload: {
        username: "test",
        password: "McGee",
        firstName: "Test",
        lastName: "McGee",
        profilePictureUrl: null,
        country: "Canada"
      }
    });
  };

  return (
    <Form noValidate autoComplete="off" onSubmit={e => handleLogin(e)}>
      <TextField
        label="Username"
        variant="outlined"
        onChange={e => setUsername(e.target.value)}
      >
        {username}
      </TextField>
      <TextField
        label="Password"
        hidden
        variant="outlined"
        onChange={e => setPassword(e.target.value)}
        type="password"
      >
        {password}
      </TextField>
      <LoginButton color="primary" type="submit" variant="contained">
        Login
      </LoginButton>
    </Form>
  );
};

export default LoginForm;
