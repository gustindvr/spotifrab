import React, { useState } from 'react';
import AuthOptions from "../../components/Auth/AuthOptions";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import BackgroundAuth from "../../assets/jpg/The-Dark-Side-of-the-Moon.jpg"
import LogoApp from "../../assets/png/logoApp.png"
import "./Auth.scss";

export default function Auth() {
  const [selectedForm, setSelectedForm] = useState(null);

  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm />;  
    
      case "register":
        return <RegisterForm setSelectedForm={setSelectedForm}/>;

      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />;
    }
  }


  return (
    <div className="auth" style={{backgroundImage: `url(${BackgroundAuth})`}}>
      <div className="auth__dark" />
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={LogoApp} alt="Spotifrab" />
        </div>
        {handlerForm()}
      </div>
    </div>
  )
}
