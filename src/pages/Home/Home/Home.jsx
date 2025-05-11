import React from "react";
import Banner from "../Banner/Banner";
import PopularCamps from "../../../components/PopularCamps/PopularCamps";
import FeedbackAndRatings from "../../../components/FeedbackAndRatings/FeedbackAndRatings";
import CampPreparationTips from "../CampPreparationTips/CampPreparationTips";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularCamps></PopularCamps>
      <FeedbackAndRatings></FeedbackAndRatings>
      <CampPreparationTips></CampPreparationTips>
    </div>
  );
};

export default Home;
