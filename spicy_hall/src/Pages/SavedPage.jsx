import React from "react";
import { styled } from "styled-components";
import styles from "../Css/SavedPage.module.css";
import PostCard from "../Components/PostCard";
import SavedCard from "../Components/SavedCard";
const SavedPage = () => {
  // const storedData =  

  let savedData = JSON.parse(localStorage.getItem("spicy_hall"))|| [];
console.log(savedData)  
console.log(savedData, "saved");
  return (
    <Div className={`${styles.SavedPage}`}>
      <div>
        <h1>My Recipes</h1>
      </div>
      <div className="savedCardsContainer">
        {savedData?.map((el) => {
          return <SavedCard {...el} />;
        })}
      </div>
    </Div>
  );
};

export default SavedPage;
const Div = styled.div`
  color: #e4c590;
  padding-top: 20px;
  min-height: 400px;
  h1 {
    font-size: 2.5rem;
  }
  .savedCardsContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }

  @media (max-width: 1100px) {
    .savedCardsContainer {
      display: flex;
      flex-direction: column;
    }
  }
`;
