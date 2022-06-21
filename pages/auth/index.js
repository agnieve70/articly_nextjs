import React, {Fragment} from "react";
import LoginForm from "../../components/auth/LoginForm";
import { getSession } from "next-auth/client";
import Head from "next/head";

function Auth(props) {
  
  return (
    <Fragment>
      <Head>
        <title>OneTap</title>
        <meta name="description" content={"Let's Save People"} />
      </Head>
      <LoginForm isMobile={ props.isMobile } />
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

      let isMobileView = (
        context.req ? context.req.headers["user-agent"] : navigator.userAgent
      ).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      );

  return {
    props: { session, isMobile: isMobileView },
  };
}

export default Auth;
