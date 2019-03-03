import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Login} from "./screens/login/Login";
import { Profile } from './screens/Profile/Profile';
import Header from './common/header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
      <Profile/>
      </div>
    );
  }
}

export default App;
