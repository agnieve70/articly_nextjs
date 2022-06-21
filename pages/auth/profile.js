import React, { Fragment } from "react";
import Head from "next/head";
import { getSession } from "next-auth/client";

import ProfileComp from "../../components/auth/ProfileComp";
import ClientComp from "../../components/auth/ClientComp";
import { getAllConcerns } from "../../helpers/api-utils";

function Profile(props) {

  return (
    <Fragment>
      <Head>
        <title>OneTap</title>
        <meta name="description" content={"Let's Save People"} />
      </Head>
      <div>{props.session.user.role === "admin" ? <ProfileComp concerns={props.concerns} /> : <ClientComp />}</div>
    </Fragment>
  );
}

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const concerns = await getAllConcerns();

  return {
    props: {
      session,
      concerns: concerns.data,
    },
  };
}

export default Profile;
