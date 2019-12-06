import React from "react";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";

const StepsList = ({ steps, setSteps }) => {
  const handleDelete = index => {
    setSteps(steps.filter((step, i) => i !== index));
  };

  const handleAdd = () => {
    setSteps([...steps, ""]);
  };

  const handleStepChange = (index, value) => {
    setSteps(steps.map((step, i) => (index === i ? value : step)));
  };

  const renderStep = (step, index) => {
    const DeleteButton = (
      <InputAdornment>
        <IconButton onClick={() => handleDelete(index)}>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </InputAdornment>
    );

    return (
      <TextField
        fullWidth
        margin="normal"
        InputProps={{ endAdornment: DeleteButton }}
        onChange={e => handleStepChange(index, e.target.value)}
        value={step}
        label={`Step ${index + 1}`}
        key={index}
        multiline
      ></TextField>
    );
  };

  return (
    <div style={{flex: 1}}>
      {steps.map((step, index) => renderStep(step, index))}
      <IconButton onClick={handleAdd}>
        <AddIcon></AddIcon>
      </IconButton>
    </div>
  );
};

export default StepsList;
