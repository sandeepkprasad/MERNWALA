import React from "react";
import mContext from "../Context/mContext";
import { useContext } from "react";

const ShowContacts = (props) => {
  const { _id, name, number } = props.contact;
  const { deleteContact, mode } = useContext(mContext);
  return (
    <div className="col-md-6 mt-2">
      <div className={`card my-3 bg-${mode}`}>
        <div className="card-body">
          <h6
            className={`card-title text-${mode === "light" ? "dark" : "light"}`}
          >
            Name : {name}
          </h6>
          <h6
            className={`card-title text-${mode === "light" ? "dark" : "light"}`}
          >
            Number : {number}
          </h6>
          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              className="btn btn-sm btn-secondary mx-2"
              onClick={() => {
                props.updateContact(props.contact);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger mx-2"
              onClick={() => {
                deleteContact(_id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowContacts;
