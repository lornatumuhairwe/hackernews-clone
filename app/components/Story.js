import React from 'react';

export default function Story (props) {
  const {title, url, time, by, descendants } = props.story;
  return (
    <React.Fragment>
      <h1 className='header'>
        <a href={url} className='link'>
          {title}
        </a>
      </h1>
      <div className="meta-info-light">
        <span>
          by <a href=''>{by}</a>
        </span>
        <span>
          on {time}
        </span>
        <span>
          with <a href=''>{descendants}</a> comments
        </span>
      </div>

      {props.comments && props.comments.map(comment => (
        <div className="comment" key={comment.id}>
          <div className="meta-info-light">
            <span>
              by <a href=''>{comment.by}</a>
            </span>
            <span>
              on {comment.time}
            </span>
          </div>
          <p dangerouslySetInnerHTML={{__html: comment.text}}/>
        </div>
      ))}
    </React.Fragment>
  )
}
