import React from 'react';
import PropTypes from 'prop-types';
import { fetchMainPosts } from '../utils/api';
import PostList from './PostList';
import Loading from './Loading';

export default class Stories extends React.Component {
  state = {
    type: this.props.type,
    stories: null,
    error: null
  };

  componentDidMount () {
    this.updateType(this.state.type)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.type !== this.props.type) {
      this.updateType(this.props.type);
    }
  }

  updateType = (type) => {
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
  };

  isLoading = () => {
    return this.state.stories === null && this.state.error === null;
  };

  render() {
    const { error, stories } = this.state;

    return(
      <React.Fragment>
        {stories && <PostList stories={stories}/>}

        {this.isLoading() && <Loading text='Fetching stories' />}

        {error && <p className='center-text error'>{error}</p>}
      </React.Fragment>
    )
  }
}

Stories.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
};
