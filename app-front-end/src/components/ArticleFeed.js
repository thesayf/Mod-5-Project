import React from 'react';
import ArticleComponent from './ArticleComponent';

function ArticleFeed(props) {

  return (
    <div className="App">
      {
        props.posts.map(post => <ArticleComponent user={props.user} addComment={props.addComment} key={post.id} post={post} />)
      }
    </div>
  );
}
 
export default ArticleFeed;
