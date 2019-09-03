import React from 'react';
import PropTypes from "prop-types";

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
          <div className="meta-info-light">
            <span>
              by <a href='' onClick={(event) => updateUserState(event, story.by)}>{story.by}</a>
            </span>
            <span>
              on {story.time}
            </span>
            <span>
              with <a href='' onClick={(event) => updateStoryState(event, story)}>{story.descendants}</a> comments
            </span>
          </div>
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
