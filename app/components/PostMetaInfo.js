import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {ThemeConsumer} from "../contexts/theme";
import { formatDate } from "../utils/helpers";

export default function PostMetaInfo ({ story }){
  const { by, time, descendants } = story;
  return (
    <ThemeConsumer>
      {
        ({ theme }) => (
          <div className={`meta-info-${theme}`}>
            <span>
              by <Link to={`/user?id=${by}`}>{by}</Link>
            </span>
            <span>
              on {formatDate(time)}
            </span>
            {descendants && <span>
              with <Link to={`/post?id=${story.id}`}>{descendants}</Link> comments
            </span>}
          </div>
        )
      }
    </ThemeConsumer>
  )
}

PostMetaInfo.propTypes = {
  story: PropTypes.object.isRequired
};
