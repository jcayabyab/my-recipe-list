import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button
} from "@material-ui/core";
import ColoredAvatar from "../../utils/ColoredAvatar";
import { useTheme } from "@material-ui/core";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { green, orange, red } from "@material-ui/core/colors";

const RatingText = styled.small`
  margin: 2px 3px;
`;

const Review = ({ review, handleDelete }) => {
  const {
    overallRating,
    presentationRating,
    tasteRating,
    nvRating,
    easyFollowRating,
    title,
    body,
    timePosted,
    writerUserName,
    profilePictureUrl,
    reviewId
  } = review;
  const { palette } = useTheme();
  const [{isAdmin}] = useContext(UserContext);

  let ratingColor = green[500];
  if (overallRating < 3.0) {
    ratingColor = red[500];
  } else if (overallRating < 6.5) {
    ratingColor = orange[500];
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <ColoredAvatar color={palette.secondary.main} src={profilePictureUrl}>
            {writerUserName.toUpperCase()[0]}
          </ColoredAvatar>
        }
        title={title}
        subheader={`By ${writerUserName} on ${timePosted
          .slice(0, 10)
          .replace(/-/g, "/")}`}
        action={
          <Box display="flex" marginTop="5px">
            <Box marginLeft="10px" textAlign="right">
              <div>
                <RatingText align="right">
                  Presentation: {presentationRating}
                </RatingText>
              </div>
              <div>
                <RatingText align="right">Taste: {tasteRating}</RatingText>
              </div>
            </Box>
            <Box margin="0 10px" textAlign="right">
              <div>
                <RatingText align="right">
                  Nutritional Value: {nvRating}
                </RatingText>
              </div>
              <div>
                <RatingText align="right">
                  Easy to Follow: {easyFollowRating}
                </RatingText>
              </div>
            </Box>
            <ColoredAvatar variant="square" color={ratingColor}>
              {overallRating}
            </ColoredAvatar>
          </Box>
        }
      ></CardHeader>

      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" component="p">
            {body}
          </Typography>
          {isAdmin && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(reviewId)}
            >
              Delete Review
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Review;
