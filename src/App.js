import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import TransitionProvider from './TransitionProvider';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
    }
  }

  toggleTransition = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  renderMoreInformation = () => {
    return (    
      <p>
        There are certain cases where it's not optimal to use CSS classes for transitions.
        Usually this is the case with conditional rendering. I doesn't make sense to load 50
        different possible components into the DOM when a user might just need about 5 of them. 
        This way components are loaded as needed, but still preserving the transition effect that
        you get with CSS.
        <br/>
        This effect also works on mobile and during resizing.
      </p>
    )
  }

  render() {
    const { show } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <small>
            A demo by
          </small>
          <a href="https://www.linkedin.com/in/sergei-grishin/">
            <h1>
              Sergei Grishin
            </h1>
          </a>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            This is a demo of adding transitions to React components.
            Click the button below to toggle the effect.
            <br/>
            <span
              role="img"
              aria-label="finger pointing to button"
            >
              👇
            </span>
          </p>
          <button
            onClick={this.toggleTransition}
            >
            Toggle Transition
          </button>
          <TransitionGroup
            component="div"
            className="transition-container"
          >
            {show &&
              <TransitionProvider key="1">
                {this.renderMoreInformation()}
              </TransitionProvider>
            }
          </TransitionGroup>
        </header>
      </div>
    );
  }
}

export default App;
