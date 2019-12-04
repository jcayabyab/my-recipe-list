import React, { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  CssBaseline,
  Container,
  Avatar,
  Grid,
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme
} from "@material-ui/core";
import {
  Fastfood as FastfoodIcon,
  LocalDining as LocalDiningIcon
} from "@material-ui/icons";
import styled from "styled-components";
import Reviews from "./Reviews";
import ColoredAvatar from "../../utils/ColoredAvatar";

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

  const { palette } = useTheme();

  const getRecipe = useCallback(async () => {
    const idFromUrl = location.pathname.split("/").slice(-1)[0];

    const { data: theRecipe } = await axios.get("/api/recipe", {
      params: {
        recipeId: idFromUrl
      }
    });

    setRecipe(theRecipe);
  }, [location]);

  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

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

  console.log(recipe);

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
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h2" style={{marginBottom: "10px"}}>{recipe.name}</Typography>
                  <Tooltip title={`By ${recipe.firstName} ${recipe.lastName}`}>
                    <ColoredAvatar
                    style={{width: "60px", height: "60px"}}
                      color={palette.secondary.main}
                      src={recipe.profilePictureUrl}
                    ></ColoredAvatar>
                  </Tooltip>
                </Box>
                <Paper style={{ height: "6em", padding: "1em" }}>
                  {recipe.description}
                </Paper>
              </div>
            </Grid>
          </Row>

          {recipe.ingredients.length || recipe.kitchenware.length ? (
            <Paper
              style={{
                padding: "1em",
                margin: "10px 10px 0px"
              }}
            >
              <Typography variant="h4" component="h4">
                This recipe needs:
              </Typography>
              <Box display="flex" marginTop="10px">
                <List style={{ flex: 1 }}>
                  {recipe.ingredients.map(ingredient => (
                    <ListItem key={ingredient.itemName}>
                      <ListItemIcon>
                        <FastfoodIcon></FastfoodIcon>
                      </ListItemIcon>
                      <ListItemText>{ingredient.itemName}</ListItemText>
                    </ListItem>
                  ))}
                </List>
                <List style={{ flex: 1 }}>
                  {recipe.kitchenware.map(item => (
                    <ListItem key={item.itemName}>
                      <ListItemIcon>
                        <LocalDiningIcon></LocalDiningIcon>
                      </ListItemIcon>
                      <ListItemText>{item.itemName}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          ) : (
            ""
          )}
          <Paper
            style={{
              padding: "1em",
              margin: "10px 10px 0px"
            }}
          >
            <Typography variant="h4" component="h4">
              Steps
            </Typography>
            <ol>
              {recipe.steps.map(step => (
                <li key={step.stepNum}>{step.description}</li>
              ))}
            </ol>
          </Paper>
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
