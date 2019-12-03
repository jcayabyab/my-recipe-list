import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  useTheme,
  Container,
  CssBaseline,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const Categories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  margin: 10px 0px;
`;

const CategoriesPage = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const { palette } = useTheme();

  useEffect(() => {
    const getAllRecipes = async () => {
      const { data: categories } = await axios.get("/api/categories");
      setCategories(categories);
    };
    getAllRecipes();
  }, [setCategories]);

  const gotoCategory = categoryName => {
    history.push("/category/" + categoryName);
  };

  // this should be iterable
  const renderCategories = () => (
    <Body>
      <Typography variant="h4">Categories</Typography>
      <Categories>
        {categories.map(({ categoryName, description, pictureUrl }) => (
          <Card
            key={categoryName}
            style={{ margin: "10px" }}
            onClick={() => gotoCategory(categoryName)}
          >
            <CardActionArea>
              <CardMedia
                image={pictureUrl}
                title={categoryName}
                style={{ height: "150px" }}
              ></CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {categoryName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Categories>
    </Body>
  );
  return (
    <React.Fragment>
      <CssBaseline />
      {renderCategories()}
    </React.Fragment>
  );
};

export default withRouter(CategoriesPage);
