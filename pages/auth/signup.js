import React from "react";
import SignupForm from "../../components/auth/SignupForm";
import { getSession } from "next-auth/client";

function SignupScreen(props) {
  return <SignupForm isMobile={props.isMobile} />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  let isMobileView = (
    context.req ? context.req.headers["user-agent"] : navigator.userAgent
  ).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

  if (!isMobileView) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  
  if (session) {
    return {
      redirect: {
        destination: "/auth/profile",
        permanent: false,
      },
    };
  }

  return {
    props: { session, isMobile: isMobileView },
  };
}

export default SignupScreen;
