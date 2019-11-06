import React from "react";

const ImageProfile = props => {
  return (
    <div className="card">
      <img
        src={"http://localhost:8080/" + props.imageUrl}
        className="card-img-top"
        alt="..."
      ></img>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <span>{props.region}</span>
      </div>
    </div>
  );
};

export default ImageProfile;
