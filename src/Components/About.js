import React from "react";
import mContext from "../Context/mContext";
import { useContext } from "react";

const About = () => {
  const { mode } = useContext(mContext);

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div
        className={`card text-${
          mode === "light" ? "black" : "white"
        } bg-${mode}`}
        style={{ width: "50rem", marginTop: "36px" }}
      >
        <div className="card-body">
          <h5 className="card-title">MERNWALA - About</h5>
          <p className="card-text">
            MERNWALA is a contact saving web application. It is developed using
            MERN Stack Technology as a personal project.
          </p>
          <p class="card-text">
            <small
              class={`text-${mode === "light" ? "body-secondary" : "white"}`}
            >
              Developed by Sandeep Kumar
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
