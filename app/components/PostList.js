import React from 'react';
import PropTypes from "prop-types";
import PostMetaInfo from "./PostMetaInfo";

export default function PostList ({ stories, updateStoryState, updateUserState }) {
  return(
    <ul>
      {stories.length > 0 && stories.map(story => (
        <li
          className='post'
          key={story.id}
        >
          <a
            href={story.url}
            className='link'
          >
            {story.title}
          </a>
          <PostMetaInfo
            story={story}
            updateUserState={updateUserState}
            updateStoryState={updateStoryState}
          />
        </li>
      ))}
    </ul>
  )
}

PostList.propTypes = {
  stories: PropTypes.array.isRequired,
  updateStoryState: PropTypes.func.isRequired,
  updateUserState: PropTypes.func.isRequired
};
