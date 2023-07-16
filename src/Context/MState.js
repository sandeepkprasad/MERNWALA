import { useState } from "react";
import mContext from "./mContext";

const MState = (props) => {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [contacts, setContacts] = useState([]);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "gray";
      showAlert("success", "Dark Mode Enabled");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("primary", "Dark Mode Disabled");
    }
  };

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });

    setTimeout(() => {
      showAlert({ type: "", message: "" });
    }, 3000);
  };

  const getContacts = async () => {
    let url = "http://localhost:5000/api/contacts/allcontacts";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });

    const userContacts = await response.json();
    setContacts(userContacts);
  };

  const addContact = async (name, number) => {
    let url = "http://localhost:5000/api/contacts/addcontact";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, number }),
    });

    const contact = await response.json();
    setContacts(contacts.concat(contact));
    showAlert("success", "Contact Saved Successfully");
  };

  const deleteContact = async (id) => {
    let url = `http://localhost:5000/api/contacts/deletecontact/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });

    const json = response.json();
    console.log(json);

    const newContacts = contacts.filter((contact) => {
      return contact._id !== id;
    });
    setContacts(newContacts);
    showAlert("success", "Contact Deleted Successfully");
  };

  const editContact = async (id, name, number) => {
    let url = `http://localhost:5000/api/contacts/updatecontact/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ id, name, number }),
    });

    const json = await response.json();
    console.log(json);

    const newContacts = JSON.parse(JSON.stringify(contacts));
    for (let i = 0; i < contacts.length; i++) {
      const element = contacts[i];

      if (element._id === id) {
        newContacts[i].name = name;
        newContacts[i].number = number;
        break;
      }
    }
    setContacts(newContacts);
    showAlert("success", "Contact Updated Successfully")
  };

  return (
    <mContext.Provider
      value={{
        mode,
        toggleMode,
        alert,
        showAlert,
        addContact,
        contacts,
        getContacts,
        deleteContact,
        editContact,
      }}
    >
      {props.children}
    </mContext.Provider>
  );
};
export default MState;
