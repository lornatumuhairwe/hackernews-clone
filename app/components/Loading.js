import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
};

export default class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
  };

  static defaultProps = {
    text: 'Loading',
    speed: 300
  };

  state = {
    text: this.props.text
  };

  componentDidMount() {
    const { speed, text } = this.props;
    this.interval = window.setInterval(() => (
      this.state.text !== text + '...' ?
        this.setState(({ text }) => ({ text: text + '.'})) :
        this.setState({ text })
    ), speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles.content}>{this.state.text}</p>
  }
}

