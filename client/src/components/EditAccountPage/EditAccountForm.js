import React, { useEffect } from "react";
import { TextField, Button, Box } from "@material-ui/core";
import styled from "styled-components";
import ColoredAvatar from "../../utils/ColoredAvatar";
import { useTheme } from "@material-ui/core";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin-top: 10px;
`;

const SubmitButton = styled(Button)`
  margin: 0px 10px;
`;

const TextFieldMargin = styled(TextField)`
  margin: 10px 0px !important;
  flex: 1;
`;

const EditAccountForm = ({ handleAccountChange, user }) => {
  const [profilePictureUrl, setProfilePictureUrl] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [showErrors, setShowErrors] = React.useState(false);

  const { palette } = useTheme();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setCountry(user.country);
      setProfilePictureUrl(user.profilePictureUrl);
    }
  }, [user]);

  const formHasErrors = () => {
    return firstName.length === 0 || lastName === 0 || country === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    // show after first submit
    setShowErrors(true);

    if (!formHasErrors()) {
      handleAccountChange(
        user.userName,
        firstName,
        lastName,
        country,
        profilePictureUrl
      );
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center">
        <ColoredAvatar
          style={{
            width: "200px",
            height: "200px",
            borderRadius: 0,
            fontSize: "90pt",
            marginRight: "15px"
          }}
          alt="profile"
          color={palette.secondary.main}
          onError={e => {
            e.target.src = null;
          }}
          src={profilePictureUrl}
        >
          {firstName[0]}
        </ColoredAvatar>
        <Box flex="1">
          <TextFieldMargin
            label="First Name"
            variant="outlined"
            onChange={e => setFirstName(e.target.value)}
            error={showErrors && firstName.length === 0}
            helperText={
              showErrors &&
              firstName.length === 0 &&
              "Please enter your first name.\n"
            }
            InputProps={{ value: firstName }}
            fullWidth
          ></TextFieldMargin>
          <TextFieldMargin
            label="Last Name"
            variant="outlined"
            onChange={e => setLastName(e.target.value)}
            error={showErrors && lastName.length === 0}
            helperText={
              showErrors &&
              lastName.length === 0 &&
              "Please enter your last name.\n"
            }
            InputProps={{ value: lastName }}
            fullWidth
          ></TextFieldMargin>
          <TextFieldMargin
            label="Country"
            variant="outlined"
            onChange={e => setCountry(e.target.value)}
            error={showErrors && country.length === 0}
            helperText={
              showErrors &&
              country.length === 0 &&
              "Please enter your country.\n"
            }
            InputProps={{ value: country }}
            fullWidth
          ></TextFieldMargin>
        </Box>
      </Box>
      <TextFieldMargin
        label="Profile Picture URL"
        variant="outlined"
        onChange={e => setProfilePictureUrl(e.target.value)}
        InputProps={{ value: profilePictureUrl }}
      ></TextFieldMargin>
      <SubmitButton color="secondary" type="submit" variant="contained">
        Submit
      </SubmitButton>
    </Form>
  );
};

export default EditAccountForm;
