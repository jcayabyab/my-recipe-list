import React from "react";
import { TextField, Button, FormHelperText, Box } from "@material-ui/core";
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
  flex: 1;
`;

const FieldsWrapper = styled(Box)`
  margin: 10px 0px 20px;
`;

const TextFieldMargin = styled(TextField)`
  margin: 0px 10px !important;
  flex: 1;
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
      <FieldsWrapper justifyContent="center" display="flex">
        <TextFieldMargin
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
        </TextFieldMargin>
        <div>
          <TextFieldMargin
            label="Password"
            hidden
            variant="outlined"
            onChange={e => setPassword(e.target.value)}
            type="password"
            autoComplete="password"
            error={showErrors && password.length === 0}
            helperText={
              showErrors &&
              password.length === 0 &&
              "Please enter a password.\n"
            }
          >
            {password}
          </TextFieldMargin>
          {incorrect && (
            <FormHelperText style={{ color: palette.error.main }}>
              Incorrect password. Please try again.
            </FormHelperText>
          )}
        </div>
      </FieldsWrapper>
      <LoginButton color="secondary" type="submit" variant="contained">
        Login
      </LoginButton>
    </Form>
  );
};

export default LoginForm;
