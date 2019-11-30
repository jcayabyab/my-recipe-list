import React from "react";
import { TextField, Button, FormHelperText, Box } from "@material-ui/core";
import styled from "styled-components";
import { useTheme } from "@material-ui/core";

const RegisterButton = styled(Button)`
  margin: 0px 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  & > * {
    margin: 10px 0px !important;
  }
`;

const TextFieldMargin = styled(TextField)`
  margin: 0px 5px 10px !important;
  flex: 1;
`;

const RegisterForm = ({ handleRegister, usernameExists }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [profilePictureUrl, setProfilePictureUrl] = React.useState("");
  const [showErrors, setShowErrors] = React.useState(false);

  const { palette } = useTheme();

  const formHasErrors = () => {
    return username.length === 0 || password.length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    // show after first submit
    setShowErrors(true);

    if (!formHasErrors()) {
      handleRegister(
        username,
        password,
        firstName,
        lastName,
        country,
        profilePictureUrl
      );
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      {usernameExists && (
        <FormHelperText style={{ color: palette.error.main }}>
          Username already exists. Please try again.
        </FormHelperText>
      )}
      <Box display="flex" justifyContent="center">
        <TextFieldMargin
          label="Username"
          variant="outlined"
          onChange={e => setUsername(e.target.value)}
          autoComplete="username"
          error={showErrors && username.length === 0}
          helperText={
            showErrors && username.length === 0 && "Please enter a username."
          }
        >
          {username}
        </TextFieldMargin>
        <TextFieldMargin
          label="Password"
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
        </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
        <TextFieldMargin
          label="First Name"
          variant="outlined"
          onChange={e => setFirstName(e.target.value)}
          autoComplete="given-name"
        >
          {firstName}
        </TextFieldMargin>
        <TextFieldMargin
          label="Last Name"
          variant="outlined"
          onChange={e => setLastName(e.target.value)}
          autoComplete="family-name"
        >
          {lastName}
        </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
        <TextFieldMargin
          label="Country"
          variant="outlined"
          onChange={e => setCountry(e.target.value)}
          autoComplete="country-name"
        >
          {country}
        </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
        <TextFieldMargin
          label="Profile Picture URL"
          variant="outlined"
          onChange={e => setProfilePictureUrl(e.target.value)}
        >
          {profilePictureUrl}
        </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
        <RegisterButton color="secondary" type="submit" variant="contained">
          Register
        </RegisterButton>
      </Box>
    </Form>
  );
};

export default RegisterForm;
