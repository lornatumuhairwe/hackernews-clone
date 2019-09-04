import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';

export default function Nav () {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className='row space-between'>
          <ul className='row nav'>
            <li>
              <NavLink
                className='btn-clear nav-link'
                exact
                to='/'
                activeStyle={{ color: 'rgb(187, 46, 31)' }}
              >
                Top
              </NavLink>
            </li>
            <li>
              <NavLink
                className='btn-clear nav-link'
                to='/new'
                activeStyle={{ color: 'rgb(187, 46, 31)' }}
              >
                New
              </NavLink>
            </li>
          </ul>
          <button
            className="btn-clear"
            style={{fontSize: 30}}
            onClick={toggleTheme}
          >
            🔦
          </button>
        </nav>
      )}
    </ThemeConsumer>
  )
}
