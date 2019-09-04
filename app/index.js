import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
// import Stories from './components/Stories';
// import Story from './components/Story';
// import User from './components/User';
import Nav from './components/Nav';
import {ThemeProvider} from "./contexts/theme";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';

const Stories = React.lazy(() => import('./components/Stories'));
const Story = React.lazy(() => import ('./components/Story'));
const User = React.lazy(() => import ('./components/User'));

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }

  }
  render(){
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <React.Suspense fallback={<Loading/>}>
                <Switch>
                  <Route
                    exact
                    path='/'
                    render={() => <Stories type='top' />}
                  />
                  <Route
                    exact
                    path='/new'
                    render={() => <Stories type='new' />}
                  />
                  <Route path='/post' component={Story} />
                  <Route path='/user' component={User} />
                  <Route render={() => <h1>404</h1>}/>
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
