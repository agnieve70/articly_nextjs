import React from "react";
import MapContent from "../components/map";
import { getAllArticles } from "../helpers/api-utils";

function HomePage(props) {
  return (
    <div className="container">
      <MapContent />
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const articles = await getAllArticles();

//   return {
//     props: {
//     },
//   };
// }

export default HomePage;
