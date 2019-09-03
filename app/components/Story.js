import React from 'react';
import PostMetaInfo from './PostMetaInfo';

export default function Story (props) {
  const {title, url } = props.story;
  return (
    <React.Fragment>
      <h1 className='header'>
        <a href={url} className='link'>
          {title}
        </a>
      </h1>
      <PostMetaInfo
        story={props.story}
        updateUserState={props.updateUserState}
        updateStoryState={props.updateStoryState}
      />

      {props.comments && props.comments.map(comment => (
        <div className="comment" key={comment.id}>
          <PostMetaInfo
            story={comment}
            updateUserState={props.updateUserState}
            updateStoryState={props.updateStoryState}
          />
          <p dangerouslySetInnerHTML={{__html: comment.text}}/>
        </div>
      ))}
    </React.Fragment>
  )
}
