import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import PostMetaInfo from "./PostMetaInfo";

export default function PostList ({ stories }) {
  return(
    <ul>
      {stories.length > 0 && stories.map(story => (
        <li
          className='post'
          key={story.id}
        >
          <Link className='link' to={`/post?id=${story.id}`}>{story.title}</Link>
          <PostMetaInfo story={story}/>
        </li>
      ))}
    </ul>
  )
}

PostList.propTypes = {
  stories: PropTypes.array.isRequired
};
