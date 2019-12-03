import React, { createContext, useReducer } from "react";
import * as types from "./types";
import ls from "local-storage";

export const UserContext = createContext();

// if false, hasn't tried retrieving yet
// if null, then not logged in
const initialState = false;
function reducer(state, action) {
  switch (action.type) {
    case types.LOGIN:
      ls.set("user", action.payload);
      return action.payload;
    case types.LOGOUT:
      ls.set("user", null);
      return null;
    default:
      return state;
  }
}

export function UserProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = [state, dispatch];
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
