import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import {
  useTheme,
  Typography,
  Box, 
  Paper
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import EditAccountForm from "./EditAccountForm";

const Body = styled(Container)`
  padding: 20px 0px;
`;

const EditAccountPage = props => {
    const handleAccountChange = async (
        userName,
        firstName,
        lastName,
        country,
        profilePictureURL
    ) => {
        try{
            const res = await axios.post("/api/user/update", {
                userName,
                firstName,
                lastName,
                country,
                profilePictureURL
            });
        } catch (err) {
            if((err.response.status = "404")){
                console.log(err.response.status);
            }
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container>
                <Paper style={{padding: "20px 20px 40px"}}>
                    <Typography variant="h4">Edit Account Information</Typography>
                    <EditAccountForm handleAccountChange={handleAccountChange}></EditAccountForm>
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default withRouter(EditAccountPage);