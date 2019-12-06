import React, {useContext} from "react";
import { TextField, Button, FormHelperText, Box, Avatar } from "@material-ui/core";
import styled from "styled-components";
import { useTheme } from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";


const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: stretch;

& > * {
  margin: 10px 0px !important;
}
`;

const SubmitButton = styled(Button)`
  margin: 0px 10px;
`;


const TextFieldMargin = styled(TextField)`
  margin: 0px 10px !important;
  flex: 1;
`;

const EditAccountForm = ({ handleAccountChange }) => {
  const [user] = useContext(UserContext);
  const [profilePictureURL, setProfilePictureURL] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [showErrors, setShowErrors] = React.useState(false);

  const { palette } = useTheme();

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
        profilePictureURL
      );
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="left">
       <Avatar
          style={{ width: "150px", height: "150px", borderRadius: 0 }}
          alt="profile pic"
          src={user.profilePictureUrl}
        />
        <TextFieldMargin
          label="Profile Picture URL"
          variant="outlined"
          onChange={e => setProfilePictureURL(e.target.value)}
          error={showErrors && profilePictureURL.length === 0}
          helperText={
            showErrors && profilePictureURL.length === 0 && "Please enter the profile picture URL.\n"
          }
        >
          {profilePictureURL}
        </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
        <TextFieldMargin
          label="First Name"
          variant="outlined"
          onChange={e => setFirstName(e.target.value)}
          error={showErrors && firstName.length === 0}
          helperText={
            showErrors && firstName.length === 0 && "Please enter your first name.\n"
          }
        >
          {firstName}
        </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
          <TextFieldMargin
            label="Last Name"
            variant="outlined"
            onChange={e => setLastName(e.target.value)}
            error={showErrors && lastName.length === 0}
            helperText={
              showErrors && lastName.length === 0 && "Please enter your last name.\n"
            }
          >
            {lastName}
          </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
          <TextFieldMargin
            label="Country"
            variant="outlined"
            onChange={e => setCountry(e.target.value)}
            error={showErrors && country.length === 0}
            helperText={
              showErrors && country.length === 0 && "Please enter the Country you reside in.\n"
            }
          >
            {country}
          </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
        <SubmitButton color="secondary" type="submit" variant="contained" >
            Submit
        </SubmitButton>
      </Box>
    </Form>
  );
};

export default EditAccountForm;