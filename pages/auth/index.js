import React, {Fragment} from "react";
import LoginForm from "../../components/auth/LoginForm";
import { getSession } from "next-auth/client";
import Head from "next/head";

function Auth() {
  
  return (
    <Fragment>
      <Head>
        <title>Articly</title>
        <meta name="description" content="Write Articles and Share it with everyone" />
      </Head>
      <LoginForm />
    </Fragment>
  );;
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
