import React from 'react';

function Article(props) {
  return (
    <div className="card p-5 mt-3">
        <h1 className='mb-5'>{props.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.content}} />
    </div>
  )
}

export default Article;