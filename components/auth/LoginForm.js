import React, {useRef} from 'react';
import Link from "next/link";
import Input from '../UI/input';
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import FormContainer from './FormContainer';
import Toast from '../UI/toast';

function LoginForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  async function formSubmitHandler(event) {
    event.preventDefault();

    const enteredEmaill = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

     const result = await signIn('credentials', {
        redirect: false, 
        email: enteredEmaill,
        password: enteredPassword
      });

      if(!result.error)
      {
         Toast({
           icon: "success",
           title: "You have successfully logged in!",
           content: "You're about to go to Dashboard.",
           timer: 2000,
         });

          router.replace("/auth/profile");
         
        // set some auth state
      }else{
        Toast({
          icon: "error",
          title: "Invalid Credentials",
          content: "Please try again.",
          timer: 3000,
        });
      }
  }

  return (
    <FormContainer title="Login to your account" withLogo={true}>
      <form onSubmit={formSubmitHandler}>
        <Input
          label={"Email Address"}
          labelId={"emailAddress"}
          inputRef={emailInputRef}
          type="email"
        />

        <Input
          label={"Password"}
          labelId={"passwordInput"}
          inputRef={passwordInputRef}
          type="password"
        />

        <div className="row justify-content-center">
          <div className="col align-self-center">
            <button className="btn mb-3" id="custom-primary">
              LOGIN
            </button>{" "}
          </div>
          <span className="text-center">
            Want to be a Member? <Link href="/auth/signup">Create Account</Link>
          </span>
        </div>
      </form>
    </FormContainer>
  );
}

export default LoginForm