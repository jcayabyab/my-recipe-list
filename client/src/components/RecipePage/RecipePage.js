import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { CssBaseline, Container, Avatar, Grid, Paper } from "@material-ui/core";
import styled from "styled-components";
import Reviews from "./Reviews";

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
  const [user] = useContext(UserContext);

  const getRecipe = async () => {
    const idFromUrl = location.pathname.split("/").slice(-1)[0];

    const { data: theRecipe } = await axios.get("/api/recipe", {
      params: {
        recipeId: idFromUrl
      }
    });

    setRecipe(theRecipe);
  };

  useEffect(() => {
    getRecipe();
  }, [location, getRecipe]);

  const handleSubmitReview = async (title, body, pres, taste, nv, easy) => {
    await axios.post("/api/review/create", {
      recipeId: recipe.recipeId,
      userName: user.userName,
      rating: {
        presentation: pres,
        taste,
        nv,
        easyToFollow: easy
      },
      title,
      body
    });

    getRecipe();
  };

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
          <Paper style={{ height: "150px" }}>.</Paper>
          <Reviews
            handleSubmitReview={handleSubmitReview}
            reviews={recipe.reviews}
          ></Reviews>
        </Column>
      </Body>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default withRouter(RecipePage);
