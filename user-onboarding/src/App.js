import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';


// Import Components
import OnboardForm from './OnboardForm';


function App() {

  const AppContainer = styled.div`
    border: 1px solid gray;
    text-align: left;
    padding: 40px 60px;
    width: 700px;
    margin: 100px auto;
    border-radius:10px;
  `

  return (
    <AppContainer className="App">
      <img src="https://www.google.com/favicon.ico"/>
      <h1>Create your Gooqle Account</h1>
      <OnboardForm />
    </AppContainer>
  );
}

export default App;
