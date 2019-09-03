import React from 'react';
import PropTypes from 'prop-types';
import { fetchMainPosts } from "../utils/api";

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

function PostList ({ stories }) {
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
              with <a href=''>{story.descendants}</a> comments
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
      error: null
    };

    this.updateType = this.updateType.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateType(this.state.type)
  }

  updateType (type) {
    this.setState({
      stories: null,
      type,
      error: null
    });

    fetchMainPosts(type.toLowerCase())
      .then(stories => {
      this.setState({
        stories,
        type,
        error: null
      })
    })
      .catch((error) => {
        console.warn('Error fetching stories', error);
        this.setState({
          error: `There was an error fetching the stories.`
        })
      })
  }

  isLoading () {
    return this.state.stories === null && this.state.error === null
  }

  render() {
    const { type, error, stories } = this.state;
    return(
      <React.Fragment>
        <TypeNav
          selected={type}
          updateType={this.updateType}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {stories && <PostList stories={stories}/>}
      </React.Fragment>
    )
  }
}
