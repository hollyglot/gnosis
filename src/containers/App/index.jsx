import React, { Component } from 'react';
import './styles.css';
import Quiz from '../Quiz';

class App extends Component {
  render() {
    return (
      <div className="application">
        <header className="application-header">
          {/*
            TODO: Add logo for gnosis
          <img className="application-logo" alt="logo" />
          }*/}
          <h1>
            Test your knowledge
          </h1>
        </header>
        <Quiz />
      </div>
    );
  }
}

export default App;
