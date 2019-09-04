import React from 'react';
import PostMetaInfo from './PostMetaInfo';
import queryString from 'query-string';
import Loading from './Loading';
import { fetchItem, fetchComments } from '../utils/api';

export default class Story extends React.Component {
  state = {
    story: null,
    error: null,
    comments: null,
    loadingStory: true,
    loadingComments: true
  };

  componentDidMount(){
    const { id } = queryString.parse(this.props.location.search);

    fetchItem(id)
      .then(story => {
        this.setState({ story, loadingStory: false });

        return fetchComments(story.kids);
      })
      .then(comments => this.setState({
        comments,
        loadingComments: false
      }))
      .catch(({ message }) => this.setState({
        error: message
      }))
  }

  render() {
    const { loadingStory } = this.state;
    return (
      <React.Fragment>
        {loadingStory === true
          ? <Loading text='Fetching post' />
          : <React.Fragment>
            <h1 className='header'>
              <a href={this.state.story.url} className='link'>
                {this.state.story.title}
              </a>
            </h1>
            <PostMetaInfo
              story={this.state.story}
              updateUserState={this.props.updateUserState}
              updateStoryState={this.props.updateStoryState}
            />
            {this.state.loadingComments === true
              ? <Loading text='Fetching comments' />
              : this.state.comments.map(comment => (
              <div className="comment" key={comment.id}>
                <PostMetaInfo
                  story={comment}
                  updateUserState={this.props.updateUserState}
                  updateStoryState={this.props.updateStoryState}
                />
                <p dangerouslySetInnerHTML={{__html: comment.text}}/>
              </div>
            ))}
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}
