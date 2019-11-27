import React, { useContext } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/SearchPage/SearchPage";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@material-ui/core";
import theme from "./contexts/MuiTheme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { state, dispatch } = useContext(UserContext);

  console.log(state);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar></NavBar>
        <div>
          <Switch>
            <Route exact path="/">
              <LandingPage></LandingPage>
            </Route>
            <PrivateRoute path="/home">
              <HomePage></HomePage>
            </PrivateRoute>
            <PrivateRoute user={state.user} path="/search">
              <SearchPage></SearchPage>
            </PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
