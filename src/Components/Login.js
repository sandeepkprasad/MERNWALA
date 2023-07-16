import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import mContext from "../Context/mContext";

const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const { showAlert, mode } = useContext(mContext);

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.jwtData);
      showAlert("success", "Login Successful");
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
        Login Your Account
      </h4>
      <form onSubmit={handleSubmit} className="mt-4">
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
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className={`form-label text-${mode === "light" ? "dark" : "light"}`}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
