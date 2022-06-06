
export async function getFaceBookApi(){
    const facebook_response = await fetch(
    "https://graph.facebook.com/v14.0/me/posts?access_token=EAAHZBmlOrjcUBALiT3QVP8xRRB5OfquQy6sZAyQIXy9XzSTVZCj3ZC9BhINlNfccOOk0Ie3J3h2CzSRuObXIauwnFyjQnIfCB0ZCkKIuWW9xamYOrfYlbn2Xdb0uT71GkZAh0Ik5m6GdxCgQSvcJMRU1IZCyMJn7sNckVPneBokuqIePCv6iy0mV8RngOk3xp6iuiQf3NWIFXfFn8XHOZBBkZAPpxAZBYrsoMZD"
  );

  const facebook_data = await facebook_response.json();
  return facebook_data;
}

export async function getCovidDataApi(){
    const covid_response = await fetch(
      "https://covid19-api-philippines.herokuapp.com/api/top-regions"
    );

    const covid_data = await covid_response.json();
    return covid_data;
}

export async function getAllArticles(){
  const response = await fetch(
    `${process.env.base_url}/api/articles`
  );

  const articles = await response.json();
  return articles;
}

export async function getMyArticleApi(email){
    const response = await fetch(`${process.env.base_url}/api/articles/my_article?email=${email}`);

    const my_article = await response.json();
    return my_article;
}

export async function publishArticle(titleValue, htmlValueFromQuill) {
  const response = await fetch("/api/articles/publish", {
    method: "POST",
    body: JSON.stringify({
      title: titleValue,
      content: htmlValueFromQuill,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  const article = response.json();
  return article;
}

export async function deleteArticle(id){
   const response = await fetch(`/api/articles/delete?id=${id}`, {
     method: "DELETE",
   });

   const article = response.json();
   return article;
}