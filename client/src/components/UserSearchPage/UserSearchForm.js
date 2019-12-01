import React from "react";
import { TextField, Button, FormHelperText, Box } from "@material-ui/core";
import styled from "styled-components";
import { useTheme } from "@material-ui/core";

const SearchButton = styled(Button)`
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
  const [username, setUsername] = React.useState("");
  const [showErrors, setShowErrors] = React.useState(false);

  const { palette } = useTheme();

  const formHasErrors = () => {
    return username.length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    // show after first submit
    setShowErrors(true);

    if (!formHasErrors()) {
      handleSearch(setUsername);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Box justifyContent="center" display="flex">
        <TextFieldMargin
          label="Username"
          variant="outlined"
          onChange={e => setUsername(e.target.value)}
          error={showErrors}
          helperText={showErrors && "Please enter a username."}
        >
          {username}
        </TextFieldMargin>
      </Box>
      <SearchButton color="secondary" type="submit" variant="contained">
        Search
      </SearchButton>
    </Form>
  );
};

export default RecipeSearchForm;
