import React, { useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";

const SearchButton = styled(Button)`
  margin: 0px 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;

  & > * {
    margin: 0px 10px !important;
  }
`;

const RecipeSearchForm = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [ingredientTags, setIngredientTags] = React.useState([]);
  const [kitchenwareTags, setKitchenwareTags] = React.useState([]);

  // for getting from server
  const [ingredients, setIngredients] = React.useState([]);
  const [kitchenware, setKitchenware] = React.useState([]);

  const INGREDIENT = "INGREDIENT";
  const KITCHENWARE = "KITCHENWARE";

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

    const ingredientItems = ingredientTags.map(({ value }) => value);
    const kitchenwareItems = kitchenwareTags.map(({ value }) => value);

    handleSearch(searchTerm, ingredientItems, kitchenwareItems);
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
      <TextField
        label="Search Term"
        variant="outlined"
        onChange={e => setSearchTerm(e.target.value)}
      >
        {searchTerm}
      </TextField>
      <Select
        isMulti
        onChange={selected => handleTagChange(selected, INGREDIENT)}
        options={ingredients.map(item => ({
          value: item.itemName,
          label: item.itemName
        }))}
        styles={{
          control: styles => ({ ...styles, width: "300px" }),
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
          control: styles => ({
            ...styles,
            width: "300px",
            margin: "0px 10px"
          }),
          menu: (provided, state) => ({
            ...provided,
            zIndex: 3
          })
        }}
        placeholder="Select kitchenware..."
      ></Select>
      <SearchButton color="secondary" type="submit" variant="contained">
        Search
      </SearchButton>
    </Form>
  );
};

export default RecipeSearchForm;
