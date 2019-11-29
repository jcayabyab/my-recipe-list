import React from "react";
import { TextField, Button, FormHelperText } from "@material-ui/core";
import styled from "styled-components";
import { useTheme } from "@material-ui/core";

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

const LoginForm = ({ handleLogin, incorrect }) => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showErrors, setShowErrors] = React.useState(false);

  const { palette } = useTheme();

  const formHasErrors = () => {
    return userName.length === 0 || password.length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    // show after first submit
    setShowErrors(true);

    if (!formHasErrors()) {
      handleLogin(userName, password);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <TextField
        label="Username"
        variant="outlined"
        onChange={e => setUserName(e.target.value)}
        autoComplete="username"
        error={showErrors && userName.length === 0}
        helperText={
          showErrors && userName.length === 0 && "Please enter a username."
        }
      >
        {userName}
      </TextField>
      <TextField
        label="Password"
        hidden
        variant="outlined"
        onChange={e => setPassword(e.target.value)}
        type="password"
        autoComplete="password"
        error={showErrors && password.length === 0}
        helperText={
          showErrors && password.length === 0 && "Please enter a password.\n"
        }
      >
        {password}
      </TextField>
      {incorrect && (
        <FormHelperText style={{ color: palette.error.main }}>
          Incorrect password. Please try again.
        </FormHelperText>
      )}
      <LoginButton color="secondary" type="submit" variant="contained">
        Login
      </LoginButton>
    </Form>
  );
};

export default LoginForm;