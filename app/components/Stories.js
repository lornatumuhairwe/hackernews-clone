import React from 'react';
import PropTypes from 'prop-types';
import { fetchMainPosts, fetchComments, fetchUser, fetchPosts } from "../utils/api";
import Story from './Story';
import PostList from './PostList';

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

function User({ user }){
  return(
    <React.Fragment>
      <h1 className='header'>
        {user.id}
      </h1>
      <div className="meta-info-light">
        <span>
          joined {user.created}
        </span>
        <span>
          has {user.karma} karma
        </span>
      </div>
    </React.Fragment>
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
      comments: null,
      user: null
    };

    this.updateType = this.updateType.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.updateStoryState = this.updateStoryState.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
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
      comments: null,
      user: null
    });

    fetchMainPosts(type.toLowerCase())
      .then(stories => {
      this.setState({
        stories,
        type,
        error: null,
        story: null,
        comments: null,
        user: null
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
    this.setState({ story, comments: null, stories: null, type: '' });

    if (story.kids){
      fetchComments(story.kids)
        .then(comments => {
          this.setState({
            comments: comments
          })
        })
    } else {
      this.setState({
        error: 'No Comments for this post available.'
      })
    }
  }

  updateUserState(event, username){
    event.preventDefault();
    fetchUser(username)
      .then(user => {
        this.setState({ user, stories: null, type: '' });
        return user.submitted.slice(0, 50);
      })
      .then(post_ids => {
        fetchPosts(post_ids)
          .then(posts => {
            this.setState({ stories: posts })
          })
      })
  }

  isLoading () {
    return this.state.stories === null && this.state.error === null && this.state.comments === null;
  }

  render() {
    const { type, error, stories, story, comments, user } = this.state;

    return(
      <React.Fragment>
        <TypeNav
          selected={type}
          updateType={this.updateType}
        />

        {user && <User user={user}/>}

        {story && <Story story={story} comments={comments} error={error} />}

        {stories && <PostList stories={stories} updateStoryState={this.updateStoryState} updateUserState={this.updateUserState}/>}

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}
      </React.Fragment>
    )
  }
}
