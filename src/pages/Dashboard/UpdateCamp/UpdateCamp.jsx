import React from "react";
import { useParams } from "react-router-dom";

const UpdateCamp = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Update Camp: {id}</h2>
    </div>
  );
};

export default UpdateCamp;
