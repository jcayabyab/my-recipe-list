import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { CssBaseline, Container, Button } from "@material-ui/core";
import styled from "styled-components";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
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
        <Row>RecipePage</Row>
      </Body>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default withRouter(RecipePage);
