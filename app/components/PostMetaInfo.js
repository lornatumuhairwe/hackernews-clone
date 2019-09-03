import React from 'react';
import PropTypes from 'prop-types';

export default function PostMetaInfo ({ story, updateUserState, updateStoryState }){
  const { by, time, descendants } = story;
  return (
    <div className="meta-info-light">
      <span>
        by <a href='' onClick={(event) => updateUserState(event, by)}>{by}</a>
      </span>
      <span>
        on {time}
      </span>
      {descendants && <span>
        with <a href='' onClick={(event) => updateStoryState(event, story)}>{descendants}</a> comments
      </span>}
    </div>
  )
}

PostMetaInfo.propTypes = {
  story: PropTypes.object.isRequired,
  updateUserState: PropTypes.func.isRequired,
  updateStoryState: PropTypes.func.isRequired
};
