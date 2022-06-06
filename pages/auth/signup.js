import React from 'react'
import SignupForm from '../../components/auth/SignupForm'
import { getSession } from "next-auth/client";

function SignupScreen() {
  return (
    <SignupForm />
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/auth/profile",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default SignupScreen