import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mContext from "../Context/mContext";
import { useContext } from "react";

const Signup = () => {
  const [cred, setCred] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();
  const { showAlert, mode } = useContext(mContext);

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "http://localhost:5000/api/auth/createuser";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.jwtData);
      showAlert("success", "Sign Up Successful");
      navigate("/");
    } else {
      showAlert("danger", "Invalid Credentials");
    }
  };
  return (
    <div className="container" style={{ width: "24rem" }}>
      <h4
        className={`d-flex justify-content-center text-${
          mode === "light" ? "dark" : "light"
        }`}
      >
        Get A New Account
      </h4>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="name"
            className={`form-label text-${mode === "light" ? "dark" : "light"}`}
          >
            Full Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={cred.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className={`form-label text-${mode === "light" ? "dark" : "light"}`}
          >
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={cred.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className={`form-label text-${mode === "light" ? "dark" : "light"}`}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={cred.password}
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
