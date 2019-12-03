import React from "react";
import { TextField, Button, FormHelperText, Box } from "@material-ui/core";
import styled from "styled-components";
import { useTheme } from "@material-ui/core";

const SearchButton = styled(Button)`
  margin: 0px 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  margin-bottom: 20px;
`;

const TextFieldMargin = styled(TextField)`
  margin: 0px 10px !important;
  flex: 1;
`;

const RecipeSearchForm = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showErrors, setShowErrors] = React.useState(false);

  const { palette } = useTheme();

  const formHasErrors = () => {
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    // show after first submit
    setShowErrors(true);

    if (!formHasErrors()) {
      handleSearch(searchTerm);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Box justifyContent="center" display="flex">
        <TextFieldMargin
          label="Search Term"
          variant="outlined"
          onChange={e => setSearchTerm(e.target.value)}
        >
          {searchTerm}
        </TextFieldMargin>
      </Box>
      <SearchButton color="secondary" type="submit" variant="contained">
        Search
      </SearchButton>
    </Form>
  );
};

export default RecipeSearchForm;
