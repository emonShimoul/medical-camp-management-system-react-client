import React from "react";
import useAuth from "../../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>HomePage Area</h2>
      <p>Hello, {user}</p>
    </div>
  );
};

export default Home;
