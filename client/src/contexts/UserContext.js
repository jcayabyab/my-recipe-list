import React from "react";
import * as types from "./types";

export const UserContext = React.createContext();

const initialState = {
  user: null
};

function reducer(state, action) {
  switch(action.type) {
    case types.LOGIN:
      return {user: action.payload};
    case types.LOGOUT:
      return {user: null};
    default:
      return state;
  } 
};

export function UserProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}
