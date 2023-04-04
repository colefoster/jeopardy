import React from "react";
import "./componentStyles.css";

const AlertCard = ({ type, message }) => {
  return (
    <div className={`alert-card ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default AlertCard;
