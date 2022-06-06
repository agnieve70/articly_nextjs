import React from "react";
import { getSession } from "next-auth/client";
import ProfileComp from "../../components/auth/ProfileComp";
import FacebookGraph from "../../components/auth/FacebookGraph";
import CovidChart from "../../components/auth/CovidChart";
import { getCovidDataApi, getFaceBookApi, getMyArticleApi } from "../../helpers/api-utils";

function Profile(props) {
  return (
    <div className="my-5">
      <CovidChart covid={props.covid} last_update={props.covid_last_update} />
      <FacebookGraph items={props.posts} />
      <ProfileComp article={props.article} />
    </div>
  );
}

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const facebook_data = await getFaceBookApi()

  const covid_data = await getCovidDataApi();

  const my_article = await getMyArticleApi(session.user.email);

  return {
    props: {
      session,
      posts: facebook_data.data ? facebook_data.data : [],
      covid: covid_data.data,
      covid_last_update: covid_data.last_update,
      article: my_article.data,
    },
  };
}

export default Profile;
