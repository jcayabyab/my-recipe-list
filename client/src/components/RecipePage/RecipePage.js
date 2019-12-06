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
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
  Button,
  IconButton
} from "@material-ui/core";
import {
  Fastfood as FastfoodIcon,
  LocalDining as LocalDiningIcon,
  Add as AddIcon,
  Check as CheckIcon
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

const RecipePage = ({ location, history }) => {
  const [recipe, setRecipe] = useState(null);
  const [user] = useContext(UserContext);

  const { palette } = useTheme();

  const getRecipe = useCallback(async () => {
    if (user) {
      const idFromUrl = location.pathname.split("/").slice(-1)[0];
      const { data: theRecipe } = await axios.get("/api/recipe", {
        params: {
          recipeId: idFromUrl,
          userName: user.userName
        }
      });

      setRecipe(theRecipe);
    }
  }, [location, user]);

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

  const handleReviewDelete = async reviewId => {
    await axios.post("/api/review/delete", {
      reviewId
    });

    getRecipe();
  };

  const handleRecipeDelete = async () => {
    await axios.post("/api/recipe/delete", {
      recipeId: recipe.recipeId
    });

    history.push("/home");
  };

  const handleListAdd = async () => {
    const idFromUrl = location.pathname.split("/").slice(-1)[0];

    if (!recipe.isInList) {
      await axios.post("/api/list/add", {
        userName: user.userName,
        recipeId: idFromUrl
      });
    }

    history.push("/list");
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
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h2" style={{ marginBottom: "10px" }}>
                    {recipe.name}
                  </Typography>
                  <Tooltip title={`By ${recipe.firstName} ${recipe.lastName}`}>
                    <ColoredAvatar
                      style={{
                        width: "60px",
                        height: "60px",
                        fontSize: "20pt"
                      }}
                      color={palette.secondary.main}
                      src={recipe.profilePictureUrl}
                      onClick={() => history.push("/user/" + recipe.userName)}
                    >
                      {recipe.firstName[0]}
                    </ColoredAvatar>
                  </Tooltip>
                </Box>
                <Paper style={{ minHeight: "6em", padding: "1em" }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1">
                      {recipe.description}
                    </Typography>
                    {recipe.isInList ? (
                      <Tooltip title="Added to list">
                        <IconButton onClick={handleListAdd}>
                          <CheckIcon></CheckIcon>
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add to personal list">
                        <IconButton onClick={handleListAdd}>
                          <AddIcon></AddIcon>
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
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
          {user.isAdmin ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRecipeDelete}
              style={{ margin: "10px" }}
            >
              Delete Recipe
            </Button>
          ) : (
            ""
          )}
          <Reviews
            handleSubmitReview={handleSubmitReview}
            reviews={recipe.reviews}
            handleReviewDelete={handleReviewDelete}
          ></Reviews>
        </Column>
      </Body>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default withRouter(RecipePage);
