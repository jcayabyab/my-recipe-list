import React from "react";
import styled from "styled-components";
import nizam from "./nizam.png"

const NavBar = styled.div`
  display: flex;
  font-family: "Comic Sans MS";
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 3px lime solid;
  color: skyblue;
  font-size: 20px;
`;

const SearchForm = styled.form`
  color: lime;
`;

const SearchPage = () => {
  return (
    <React.Fragment>
      <NavBar>
        <div>MyRecipeList for Jancuks</div>
        <div>My List</div>
        <div>Search</div>
        <div>Logout</div>
      </NavBar>
      <SearchForm>
        <div>
          <label>Name: </label>
          <input type="text"></input>
        </div>
        <div>
          <label>Ingredient: </label>
          <input type="text"></input>
        </div>
        <div>
          <label>Kitchin' Ahtem: </label>
          <input type="text"></input>
        </div>
        <input type="submit"></input>
      </SearchForm>
      <img src={nizam} alt="nizam hello" style={{height: "300px", width: "300px", float: "right"}}></img>
    </React.Fragment>
  );
};

export default SearchPage;
