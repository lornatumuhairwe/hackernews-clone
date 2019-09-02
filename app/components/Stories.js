import React from 'react';
import PropTypes from 'prop-types';

function TypeNav({ selected, updateType }){
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

export default class Stories extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      type: 'Top'
    };

    this.updateType = this.updateType.bind(this);
  }

  updateType(type) {
    this.setState({ type })
  }

  render() {
    const { type } = this.state;
    return(
      <React.Fragment>
        <TypeNav
          selected={type}
          updateType={this.updateType}
        />
      </React.Fragment>
    )
  }
}
