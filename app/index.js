import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Stories from './components/Stories';

class App extends React.Component {
  render(){
    return (
      <div className='container'>
        <Stories />
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
