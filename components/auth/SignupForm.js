import React, { useRef, useState } from "react";
import Link from "next/link";
import Toast from "../UI/toast";
import Input from "../UI/input";
import FormContainer from "./FormContainer";

async function createUser(name, email, password, isMobile) {
  const response = await fetch("/api/auth/signup", {
    method: "post",
    body: JSON.stringify({ name, email, password, role: isMobile ? 'client' : 'admin' }),
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

function SignupForm(props) {
  const { isMobile } = props;
  const [isLoading, setIsLoading] = useState(false);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      setIsLoading(true);

      const result = await createUser(
        enteredName,
        enteredEmail,
        enteredPassword,
        isMobile
      );

      Toast({
        icon: "success",
        title: "User Successfully Created!",
        content: "An email was sent to confirm your account.",
        timer: 5000
      });

      if (result) {
        setIsLoading(false);

        Toast({
          icon: "success",
          title: "User Successfully Created!",
          content: "An email was sent to confirm your account.",
          timer: 5000,
        });
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

  return (
    <FormContainer title="Welcome! Please create an account" withLogo={true}>
      {isLoading && (
        <div className="row justify-content-center">
          <div className="spinner-border text-primary me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading ...
        </div>
      )}
      <form onSubmit={submitHandler}>
        <Input
          label={"Name"}
          labelid={"name"}
          inputref={nameInputRef}
          type="text"
        />

        <Input
          label={"Email Address"}
          labelid={"emailAddress"}
          inputref={emailInputRef}
          type="email"
        />

        <Input
          label={"Password"}
          labelid={"passwordInput"}
          inputref={passwordInputRef}
          type="password"
        />

        <div className="row justify-content-center">
          <div className="col-md-8 align-self-center">
            <button className="btn mb-3" id="custom-primary">
              CREATE ACCOUNT
            </button>
          </div>
          <span className="text-center">
            Already a Member? <Link href="/auth">Login</Link>{" "}
          </span>
        </div>
      </form>
    </FormContainer>
  );
}

export default SignupForm;
