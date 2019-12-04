import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import {
  useTheme,
  Container,
  CssBaseline,
  Typography,
  Paper
} from "@material-ui/core";
import axios from "axios";
import CreateRecipeForm from "./CreateRecipeForm";
import styled from "styled-components";

const CreateRecipePage = ({ location, history }) => {
  const [{ userName }] = useContext(UserContext);

  const handleSubmit = async (
    recipeName,
    description,
    pictureUrl,
    ingredients,
    kitchenware,
    steps
  ) => {
    try {
      const res = await axios.post("/api/recipe/create", {
        name: recipeName,
        description,
        pictureUrl,
        ingredients,
        kitchenware,
        steps: steps.filter(step => step.length),
        userName: userName
      });

      history.push(`/recipes/${res.data.recipeId}`);
    } catch (err) {
      console.log(err.response.status);
    }
  };

  const { palette } = useTheme();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Paper style={{padding: "20px 20px 40px"}}>
          <Typography variant="h4">Create a new recipe</Typography>
          <CreateRecipeForm handleSave={handleSubmit}></CreateRecipeForm>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(CreateRecipePage);
