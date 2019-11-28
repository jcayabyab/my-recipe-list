import React, { useContext } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/SearchPage/SearchPage";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@material-ui/core";
import theme from "./contexts/MuiTheme";
import { Switch, Route, withRouter } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { UserContext } from "./contexts/UserContext";

const App = props => {
  const [ userState ] = useContext(UserContext);

  return (
    <ThemeProvider theme={theme}>
      {props.location.pathname !== "/" && <NavBar></NavBar>}
      <Switch>
        <Route exact path="/">
          <LandingPage></LandingPage>
        </Route>
        <PrivateRoute user={userState.user} path="/home">
          <HomePage></HomePage>
        </PrivateRoute>
        <PrivateRoute user={userState.user} path="/search">
          <SearchPage></SearchPage>
        </PrivateRoute>
      </Switch>
    </ThemeProvider>
  );
};

export default withRouter(App);
