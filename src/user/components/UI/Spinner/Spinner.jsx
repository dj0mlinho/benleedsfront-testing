import Spinner from "react-bootstrap/Spinner";
import React from "react";

const SpinnerCustom = () => {
  return (
    <div className="m-3">
      <Spinner animation="border" variant="info" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="border" variant="info" />
    </div>
  );
};

export default SpinnerCustom;
