import React from "react";
import ArticleGrid from "../components/articles/article-grid";
import { getAllArticles } from "../helpers/api-utils";

function HomePage(props) {
  return (
    <div className="container">
      <ArticleGrid items={props.articles} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const articles = await getAllArticles();

  return {
    props: {
      articles: articles.data,
    },
  };
}

export default HomePage;
