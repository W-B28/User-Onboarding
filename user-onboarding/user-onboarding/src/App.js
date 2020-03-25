import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import * as yup from 'yup';
import Form from './components/Form'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>New User? Sign Up!</h1>
        <Form />
      </header>
    </div>
  );
}

export default App;
