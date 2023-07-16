import React from "react";
import { useContext } from "react";
import mContext from "../Context/mContext";

const Alert = () => {
  const { alert } = useContext(mContext);

  return (
    <div className="container d-flex justify-content-center">
      <div
        className={`alert alert-${alert.type} d-flex justify-content-center`}
        role="alert"
        style={{ width: "24rem", height: "60px" }}
      >
        {alert.message}
      </div>
    </div>
  );
};

export default Alert;
