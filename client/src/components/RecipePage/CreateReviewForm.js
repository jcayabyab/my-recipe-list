import React from "react";
import {
  TextField,
  Button,
  FormHelperText,
  Paper,
  Typography
} from "@material-ui/core";
import styled from "styled-components";
import { useTheme } from "@material-ui/core";

const CreateButton = styled(Button)`
  margin: 20px 10px !important;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  margin-top: 15px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0px;
  & > * {
    flex: 1 !important;
  }
`;

const TextFieldMargin = styled(TextField)`
  margin: 0px 10px !important;
  flex: 1;
`;

const CreateReviewForm = ({ handleSubmitReview }) => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [pres, setPres] = React.useState("");
  const [taste, setTaste] = React.useState("");
  const [nv, setNv] = React.useState("");
  const [easy, setEasy] = React.useState("");
  const [showErrors, setShowErrors] = React.useState(false);

  const { palette } = useTheme();

  const missingRating = pres === "" || taste === "" || easy === "" || nv === "";

  const formHasErrors = () => {
    return title.length === 0 || body.length === 0 || missingRating;
  };

  const handleSubmit = e => {
    e.preventDefault();
    // show after first submit
    setShowErrors(true);

    if (!formHasErrors()) {
      setTitle("");
      setBody("");
      setPres("");
      setTaste("");
      setNv("");
      setEasy("");
      setShowErrors(false);
      handleSubmitReview(title, body, pres, taste, nv, easy);
    }
  };

  return (
    <Paper style={{padding: "10px", margin: "20px 0px"}}>

      <Typography variant="h5">Leave a review:</Typography>
      <Form noValidate onSubmit={handleSubmit}>
        <TextFieldMargin
          label="Title"
          variant="outlined"
          onChange={e => setTitle(e.target.value)}
          error={showErrors && title.length === 0}
          helperText={
            showErrors && title.length === 0 && "Please enter a title."
          }
          fullWidth
          InputProps={{ value: title }}
        ></TextFieldMargin>
        {missingRating && showErrors && (
          <FormHelperText style={{ color: palette.error.main }}>
            Please provide all ratings.
          </FormHelperText>
        )}
        <Row>
          <TextFieldMargin
            label="Presentation Rating (0-10)"
            onChange={e => {
              const input = +e.target.value;
              if (!isNaN(input) && input <= 10 && input >= 0) {
                setPres(e.target.value);
              }
            }}
            InputProps={{ value: pres }}
            variant="outlined"
          ></TextFieldMargin>
          <TextFieldMargin
            label="Taste Rating (0-10)"
            onChange={e => {
              const input = +e.target.value;
              if (!isNaN(input) && input <= 10 && input >= 0) {
                setTaste(e.target.value);
              }
            }}
            InputProps={{ value: taste }}
            variant="outlined"
          ></TextFieldMargin>
          <TextFieldMargin
            label="Nutritional Value Rating (0-10)"
            onChange={e => {
              const input = +e.target.value;
              if (!isNaN(input) && input <= 10 && input >= 0) {
                setNv(e.target.value);
              }
            }}
            InputProps={{ value: nv }}
            variant="outlined"
          ></TextFieldMargin>
          <TextFieldMargin
            label="Easy to Follow Rating (0-10)"
            onChange={e => {
              const input = +e.target.value;
              if (!isNaN(input) && input <= 10 && input >= 0) {
                setEasy(e.target.value);
              }
            }}
            InputProps={{ value: easy }}
            variant="outlined"
          ></TextFieldMargin>
        </Row>
        <TextFieldMargin
          label="Description"
          multiline
          rows="5"
          fullWidth
          hidden
          variant="outlined"
          onChange={e => setBody(e.target.value)}
          autoComplete="password"
          error={showErrors && body.length === 0}
          helperText={
            showErrors && body.length === 0 && "Please enter a body.\n"
          }
          InputProps={{ value: body }}
        >
          {body}
        </TextFieldMargin>
        <CreateButton color="secondary" type="submit" variant="contained">
          Submit Review
        </CreateButton>
      </Form>
    </Paper>
  );
};

export default CreateReviewForm;
