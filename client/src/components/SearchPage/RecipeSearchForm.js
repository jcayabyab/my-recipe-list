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

const TextFieldMargin = styled(TextField)`
  margin: 10px 10px 20px 10px !important;
  flex: 1;
`;

const RecipeSearchForm = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
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
      handleSearch(setSearchTerm);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Box justifyContent="center" display="flex">
        <TextFieldMargin
          label="Search Term"
          variant="outlined"
          onChange={e => setSearchTerm(e.target.value)}
          error={showErrors}
          helperText={showErrors && "Please enter a term."}
        >
          {searchTerm}
        </TextFieldMargin>
      </Box>
      <LoginButton color="secondary" type="submit" variant="contained">
        Search
      </LoginButton>
    </Form>
  );
};

export default RecipeSearchForm;
