import React, { useContext, useEffect, useRef, useState } from "react";
import AddContact from "./AddContact";
import ShowContacts from "./ShowContacts";
import mContext from "../Context/mContext";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const { contacts, getContacts, editContact, mode } = useContext(mContext);
  let navigate = useNavigate();
  const [contact, setContact] = useState({ id: "", uname: "", unumber: "" });
  const refOpen = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getContacts();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateContact = (currentContact) => {
    refOpen.current.click();
    setContact({
      id: currentContact._id,
      uname: currentContact.name,
      unumber: currentContact.number,
    });
  };

  const handleClick = () => {
    refClose.current.click();
    editContact(contact.id, contact.uname, contact.unumber);
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={refOpen}
        >
          Launch modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className={`modal-content bg-${mode}`}>
              <div className="modal-header">
                <h1
                  className={`modal-title fs-5 text-${
                    mode === "light" ? "dark" : "light"
                  }`}
                  id="exampleModalLabel"
                >
                  Edit Contact
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className={`form-label text-${
                        mode === "light" ? "dark" : "light"
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="name"
                      className="form-control"
                      id="uname"
                      name="uname"
                      value={contact.uname}
                      aria-describedby="emailHelp"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="number"
                      className={`form-label text-${
                        mode === "light" ? "dark" : "light"
                      }`}
                    >
                      Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="unumber"
                      name="unumber"
                      value={contact.unumber}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleClick}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2
        className={`d-flex justify-content-center mb-4 text-${
          mode === "light" ? "dark" : "light"
        }`}
      >
        MERNWALA (MERN Stack)
      </h2>
      <div className="container d-flex">
        <AddContact />
        <div className="row" style={{ width: "50%" }}>
          <h4
            className={`d-flex justify-content-center text-${
              mode === "light" ? "dark" : "light"
            }`}
          >
            Saved Contacts
          </h4>
          {contacts &&
            contacts.map((contact) => {
              return (
                <ShowContacts
                  key={contact._id}
                  contact={contact}
                  updateContact={updateContact}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Contacts;
