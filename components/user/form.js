import React, { useRef, useState, useEffect } from "react";
import Input from "../UI/input";
import Toast from "../UI/toast";

async function createUser(name, email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "post",
    body: JSON.stringify({
      name,
      email,
      password,
      role: "admin",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

async function updateUser(id, name, email) {

  console.log("ID: ", id);
  console.log("NAME: ", name);
  console.log("EMAIL: ", email);

  const response = await fetch("/api/auth/update", {
    method: "PATCH",
    body: JSON.stringify({
      id,
      name,
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function UserForm(props) {
  const { user } = props;

  const [isLoading, setIsLoading] = useState(false);

  const nameInputRef = useRef(user ? user.name : "test");
  const emailInputRef = useRef(user ? user.email : "");
  const passwordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;


    if (user) {
      try {
        const result = await updateUser(
          user._id,
          enteredName === "" ? user.name : enteredName,
          enteredEmail === "" ? user.email : enteredEmail
        );
        if (result) {
          setIsLoading(false);

          Toast({
            icon: "success",
            title: "User Successfully Updated!",
            content: "An email was sent to confirm account.",
            timer: 5000,
          });

          props.setAction(props.action + 1);
        }
      } catch (error) {
        setIsLoading(false);

        Toast({
          icon: "error",
          title: "Something went wrong!",
          content: error.message,
          timer: 5000,
        });
      }
    } else {
      const enteredPassword = passwordInputRef.current.value;

      try {
        setIsLoading(true);

        const result = await createUser(
          enteredName,
          enteredEmail,
          enteredPassword
        );

        if (result) {
          setIsLoading(false);

          Toast({
            icon: "success",
            title: "User Successfully Created!",
            content: "An email was sent to confirm account.",
            timer: 5000,
          });

          props.setAction(props.action + 1);
        }
      } catch (error) {
        setIsLoading(false);

        Toast({
          icon: "error",
          title: "Something went wrong!",
          content: error.message,
          timer: 5000,
        });
      }
    }
  }

  function clearUserHandler() {
    props.setUser(null);
  }

  function clearFieldsHandler() {
    nameInputRef.current.value = "";
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  }

  return (
    <div className="card p-5 shadow">
      {isLoading && (
        <div className="row justify-content-center">
          <div className="spinner-border text-primary me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading ...
        </div>
      )}
      <h4 className="text-secondary">Admin User</h4>
      <form onSubmit={submitHandler}>
        <Input
          label={"Name"}
          labelid={"name"}
          inputref={nameInputRef}
          type="text"
          placeholder={user ? user.name : ""}
        />

        <Input
          label={"Email Address"}
          labelid={"emailAddress"}
          inputref={emailInputRef}
          type="email"
          placeholder={user ? user.email : ""}
        />

        {!props.user ? (
          <Input
            label={"Password"}
            labelid={"passwordInput"}
            inputref={passwordInputRef}
            type="password"
          />
        ) : null}

        <div className="row justify-content-center">
          <div className="col-md-10 align-self-center">
            <button type="submit" className="btn mb-3" id="custom-primary">
              {props.user ? "UPDATE ACCOUNT" : "CREATE ACCOUNT"}
            </button>

            <button
              type="button"
              onClick={props.user ? clearUserHandler : clearFieldsHandler}
              className="btn mb-3"
              id="custom-secondary"
            >
              CLEAR FIELD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
