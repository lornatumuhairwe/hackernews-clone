import React from 'react';
import PropTypes from 'prop-types';
import { fetchMainPosts, fetchComments } from "../utils/api";
import Story from './Story';

function TypeNav ({ selected, updateType }) {
  const types = ['Top', 'New'];

  return (
    <ul className='row nav'>
      {types.map(type => (
        <li key={type}>
          <button
            className='btn-clear nav-link'
            style={ type === selected ? { color: 'rgb(187, 46, 31)' } : null }
            onClick={() => updateType(type)}
          >
            {type}
          </button>
        </li>
      ))}
    </ul>
  )
}

TypeNav.propTypes = {
  selected: PropTypes.string.isRequired,
  updateType: PropTypes.func.isRequired
};

function PostList ({ stories, updateStoryState }) {
  return(
    <ul>
      {stories.map(story => (
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
              by <a href=''>{story.by}</a>
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

export default class Stories extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      type: 'Top',
      stories: null,
      error: null,
      story: null,
      comments: null
    };

    this.updateType = this.updateType.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.updateStoryState = this.updateStoryState.bind(this);
  }

  componentDidMount() {
    this.updateType(this.state.type)
  }

  updateType (type) {
    this.setState({
      stories: null,
      type,
      error: null,
      story: null,
      comments: null
    });

    fetchMainPosts(type.toLowerCase())
      .then(stories => {
      this.setState({
        stories,
        type,
        error: null,
        story: null,
        comments: null
      })
    })
      .catch((error) => {
        console.warn('Error fetching stories', error);
        this.setState({
          error: `There was an error fetching the stories.`
        })
      })
  }

  updateStoryState(event, story){
    event.preventDefault();
    this.setState({ story, comments: null });

    fetchComments(story.kids)
      .then(comments => {
        this.setState({
          comments: comments
        })
      })
  }

  isLoading () {
    return this.state.stories === null && this.state.error === null
  }

  render() {
    const { type, error, stories, story, comments } = this.state;

    if (story) {
      return <Story story={story} comments={comments}/>
    }

    return(
      <React.Fragment>
        <TypeNav
          selected={type}
          updateType={this.updateType}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {stories && <PostList stories={stories} updateStoryState={this.updateStoryState}/>}
      </React.Fragment>
    )
  }
}
