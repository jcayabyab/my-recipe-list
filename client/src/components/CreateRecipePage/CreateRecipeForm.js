import React, { useEffect } from "react";
import { TextField, Button, FormHelperText, Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useTheme } from "@material-ui/core";
import StepsList from "./StepsList";
import Select from "react-select";
import axios from "axios";

const SaveButton = styled(Button)`
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

const INGREDIENT = "INGREDIENT";
const KITCHENWARE = "KITCHENWARE";

const CreateRecipeForm = ({ handleSave }) => {
  const [recipeName, setRecipeName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [pictureUrl, setPictureUrl] = React.useState("");
  const [showErrors, setShowErrors] = React.useState(false);
  const [ingredientTags, setIngredientTags] = React.useState([]);
  const [kitchenwareTags, setKitchenwareTags] = React.useState([]);
  const [steps, setSteps] = React.useState([""]);

  // for getting from server
  const [ingredients, setIngredients] = React.useState([]);
  const [kitchenware, setKitchenware] = React.useState([]);

  const { palette } = useTheme();

  const formHasErrors = () => {
    return recipeName.length === 0;
  };

  useEffect(() => {
    const getIngredients = async () => {
      const { data: theIngredients } = await axios.get("/api/ingredients");
      setIngredients(theIngredients);
    };

    const getKitchenware = async () => {
      const { data: theKitchenware } = await axios.get("/api/kitchenware");
      setKitchenware(theKitchenware);
    };

    getIngredients();
    getKitchenware();
  }, [setIngredients, setKitchenware]);

  const handleSubmit = e => {
    e.preventDefault();
    // show after first submit
    setShowErrors(true);

    if (!formHasErrors()) {
      handleSave(
        recipeName,
        description,
        pictureUrl,
        ingredientTags.map(ingredient => ingredient.value),
        kitchenwareTags.map(item => item.value),
        steps
      );
    }
  };

  const handleTagChange = (tags, type) => {
    switch (type) {
      case INGREDIENT:
        setIngredientTags(tags);
        break;
      case KITCHENWARE:
        setKitchenwareTags(tags);
        break;
      default:
        break;
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="center">
        <TextFieldMargin
          label="Recipe Name"
          variant="outlined"
          fullWidth
          onChange={e => setRecipeName(e.target.value)}
          error={showErrors && recipeName.length === 0}
          helperText={
            showErrors && recipeName.length === 0 && "Please enter a name."
          }
        >
          {recipeName}
        </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
        <TextFieldMargin
          label="Description"
          variant="outlined"
          multiline
          rowsMax="5"
          onChange={e => setDescription(e.target.value)}
        >
          {description}
        </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
        <TextFieldMargin
          label="Recipe Picture URL"
          variant="outlined"
          onChange={e => setPictureUrl(e.target.value)}
        >
          {pictureUrl}
        </TextFieldMargin>
      </Box>
      <Box display="flex" justifyContent="center">
      <Typography variant="h5">The recipe needs:</Typography>
      </Box>
      <Box display="flex" justifyContent="space-around">
        <Select
          isMulti
          onChange={selected => handleTagChange(selected, INGREDIENT)}
          options={ingredients.map(item => ({
            value: item.itemName,
            label: item.itemName
          }))}
          styles={{
            container: styles => ({ ...styles, flex: "1", margin: "0px 20px" }),
            menu: (provided, state) => ({
              ...provided,
              zIndex: 3
            })
          }}
          placeholder="Select ingredients..."
        ></Select>
        <Select
          isMulti
          onChange={selected => handleTagChange(selected, KITCHENWARE)}
          options={kitchenware.map(item => ({
            value: item.itemName,
            label: item.itemName
          }))}
          styles={{
            container: styles => ({ ...styles, flex: "1", margin: "0px 20px" }),
            menu: (provided, state) => ({
              ...provided,
              zIndex: 3
            })
          }}
          placeholder="Select kitchenware..."
        ></Select>
      </Box>
      <Box display="flex" justifyContent="center">
        <StepsList steps={steps} setSteps={setSteps}></StepsList>
      </Box>
      <Box display="flex" justifyContent="center">
        <SaveButton color="secondary" type="submit" variant="contained">
          Save
        </SaveButton>
      </Box>
    </Form>
  );
};

export default CreateRecipeForm;
