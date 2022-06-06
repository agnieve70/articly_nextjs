/* eslint-disable react/jsx-key */
import React from 'react';
import Article from './article';

function ArticleGrid(props) {
  return (
    <div className="row justify-content-center mt-3">
      {props.items.map((item) => (
        <Article title={item.title} content={item.content} />
      ))}
    </div>
  );
}

export default ArticleGrid