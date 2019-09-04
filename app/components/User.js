import React from 'react';
import queryString from 'query-string';
import { ThemeConsumer } from '../contexts/theme';
import {fetchPosts, fetchUser} from '../utils/api';
import Loading from './Loading';
import PostList from './PostList';

export default class User extends React.Component {
  state = {
    user: null,
    loadingUser: true,
    stories: null,
    loadingStories: true,
    error: null
  };

  componentDidMount(){
    const { id } = queryString.parse(this.props.location.search);

    fetchUser(id)
      .then(user => {
        this.setState({ user, loadingUser: false });

        return fetchPosts(user.submitted.slice(0, 30))
      })
      .then(stories => {
        this.setState({ stories, loadingStories: false })
      })
      .catch(({ message }) => this.setState({
        error: message,
        loadingUser: false,
        loadingStories: false
      }))
  }
  render () {
    const { loadingUser, loadingStories, user, stories, error } = this.state;

    if (error) {
      return <p className='center-text error'>{error}</p>
    }

    return(
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            { loadingUser === true
              ? <Loading text='Fetching user'/>
              : <React.Fragment>
                <h1 className='header'>
                  {user.id}
                </h1>
                <div className={`meta-info-${theme}`}>
                  <span>
                    joined {user.created}
                  </span>
                      <span>
                    has {user.karma} karma
                  </span>
                </div>
                <p dangerouslySetInnerHTML={{__html: user.about }} />
              </React.Fragment>
            }
            {loadingStories === true
              ? loadingUser === false && <Loading text='Fetching posts' />
              : <React.Fragment>
                  <h2>Posts</h2>
                <PostList stories={stories}/>
              </React.Fragment>}
          </React.Fragment>
        )}
      </ThemeConsumer>
    )
  }
}
