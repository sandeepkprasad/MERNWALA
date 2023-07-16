import React, { useState } from "react";
import mContext from "../Context/mContext";
import { useContext } from "react";

const AddContact = () => {
  const [contact, setContact] = useState({ name: "", number: "" });
  const { addContact, mode } = useContext(mContext);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    addContact(contact.name, contact.number);
    setContact({ name: "", number: "" });
  };
  return (
    <div className="container" style={{ width: "24rem" }}>
      <h4
        className={`d-flex justify-content-center text-${
          mode === "light" ? "dark" : "light"
        }`}
      >
        Add Contact
      </h4>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="name"
            className={`form-label text-${mode === "light" ? "dark" : "light"}`}
          >
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            value={contact.name}
            aria-describedby="emailHelp"
            onChange={handleChange}
            minLength={7}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="number"
            className={`form-label text-${mode === "light" ? "dark" : "light"}`}
          >
            Number
          </label>
          <input
            type="number"
            className="form-control"
            id="number"
            name="number"
            value={contact.number}
            onChange={handleChange}
            minLength={10}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddContact;
