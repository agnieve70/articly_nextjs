import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { getSession } from "next-auth/client";

function Auth() {
  return <LoginForm />;
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

export default Auth;
