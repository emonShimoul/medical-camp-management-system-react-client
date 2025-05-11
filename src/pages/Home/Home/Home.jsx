import React from "react";
import Banner from "../Banner/Banner";
import PopularCamps from "../../../components/PopularCamps/PopularCamps";
import FeedbackAndRatings from "../../../components/FeedbackAndRatings/FeedbackAndRatings";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularCamps></PopularCamps>
      <FeedbackAndRatings></FeedbackAndRatings>
    </div>
  );
};

export default Home;
