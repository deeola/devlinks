import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button/Button';
import Tabs from './components/Tabs/Tabs';
import InputField from './components/Input/InputField';
import iconLink from "./assets/images/icon-link.svg";

function App() {
  return (
    <div className="App">
      <Button text='adebola' />
      <Button text='praise' backgroundSubtype='active'  />
      <Button text='adeola'  backgroundSubtype='disabled' />

      <Button text='johnson' buttonType='secondary'/>
      <Button text='miracle' backgroundSubtype='active' buttonType='secondary' />
      <Button text='adesola'  backgroundSubtype='disabled' buttonType='secondary'/>
      <Tabs text='active'/>
      <Tabs text='default' TabsType="default" />

      <InputField type='text' name='login'id='login' errorMessage='please check again ' img={iconLink}  />
    </div>
  );
}

export default App;
