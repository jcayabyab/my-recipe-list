import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  CssBaseline,
  Container,
  Button,
  Avatar,
  Box,
  Grid,
  Paper
} from "@material-ui/core";
import styled from "styled-components";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin: 0px 10px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > * {
    margin: 0px 10px;
  }
`;

const RecipePage = ({ location }) => {
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    const getRecipe = async () => {
      const idFromUrl = location.pathname.split("/").slice(-1)[0];

      const { data: theRecipe } = await axios.get("/api/recipe", {
        params: {
          recipeId: idFromUrl
        }
      });

      setRecipe(theRecipe);
    };

    getRecipe();
  }, [location]);

  /*
  this is the data (for now, we'll add more later)
  {
    recipeId: Number (don't have to show)
    name: String,
    description: String,
    pictureUrl: String,
    overallRating: Number
  }
  */

  return recipe ? (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <Body>
        <Column>
          <Row>
            <Avatar
              variant="square"
              style={{ width: "150px", height: "150px", borderRadius: 0 }}
              alt="recipe pic"
              src={recipe.pictureUrl}
            />
            <Grid item xs>
              <div>
                <span>
                  <h2>{recipe.name}</h2>
                </span>
                <span>
                  <Paper style={{ height: "100px" }}>
                    {recipe.description}
                  </Paper>
                </span>
              </div>
            </Grid>
          </Row>
          <h2>&nbsp;&nbsp;Ingredient</h2>
          <Paper style={{ height: "150px" }}>
            .
          </Paper>
        </Column>
      </Body>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default withRouter(RecipePage);
