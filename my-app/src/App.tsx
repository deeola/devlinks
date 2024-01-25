import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button/Button';
import Tabs from './components/Tabs/Tabs';
import InputField from './components/Input/InputField';
import iconLink from "./assets/images/icon-link.svg";
import Dropdown from './components/Dropdown/Dropdown';
import ImageUploadComponent from './components/Uploadimage/UploadImage';
import Logo from './components/Logo/Logo';
import Auth from './pages/Auth';
import Customize from './pages/Customize/Customize';
import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Button text='adebola' />
      <Button text='praise' backgroundSubtype='active'  />
      <Button text='adeola'  backgroundSubtype='disabled' />

      <Button text='johnson' buttonType='secondary'/>
      <Button text='miracle' backgroundSubtype='active' buttonType='secondary' />
      <Button text='adesola'  backgroundSubtype='disabled' buttonType='secondary'/>
      <Tabs text='active'/>
      <Tabs text='default' TabsType="default" />

      <InputField type='text' name='login'id='login' errorMessage='please check again ' img={iconLink}  />

      <Dropdown options={[{value :  "hello", label:  "Option 1", image : iconLink}, {value :  "hi", label:  "Option 2", image:iconLink}]} img={iconLink}/>
    <ImageUploadComponent />
    <Logo size='large' /> */}

     {/* <Auth componentType='login' />  */}
     <Customize />

     {/* <Auth componentType='create' />  */}

     {/* <Routes>

          <Route path="/" element={<Customize/>} />
          <Route path="/login" element={<Auth componentType='create' />} />


      </Routes> */}


    </div>
  );
}

export default App;
