import React, {useState} from 'react';
import {Button, Icon, Form, Input} from "semantic-ui-react";
import {toast}from "react-toastify";
import {validateEmail} from "../../../utils/Validations";
import firebase from "../../../utils/firebase";
import "firebase/auth";


import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaultValueForm());
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const handlerShowPassword= () => {
    setShowPassword(!showPassword);
  }


  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = () =>{
    setFormError({});
    let errors = {};
    let formOk = true;

    if(!validateEmail(formData.email)){
      errors.email = true;
      formOk = false;
    }

    if(formData.password.length < 6 ){
      errors.password = true;
      formOk = false;
    } 

    if(formData.username) {
      errors.username = true;
      formOk = false;
    }
    setFormError(errors);

    if(formOk) {
      setIsLoading(true);
      
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then( () => {
        changeUserName();
        sendVerificationEmail()
      }).catch( () => {
        toast.error("Error al crear la cuenta.")
      }).finally( () => {
        setIsLoading(false);
        setSelectedForm(null);
      })
    }
  }

  const changeUserName = () => {
    firebase.auth().currentUser.updateProfile({
      displayName: formData.username
    }).catch(() => {
      toast.error("Error al asignar el nombre de usuario.");
    })
  }

  const sendVerificationEmail = () => {
    firebase.auth().currentUser.sendEmailVerification().then(() => {
      toast.success("Se ha enviado un email de verificacion a tu casilla de correo");
    }).catch(() => {
      toast.error("Error al enviar el email de verificación");
    })
  }

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Spotifrab gratis.</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input 
            type="text"
            name="email"
            placeholder="correro electronico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
             Por favor, ingresá un correo electronico válido
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input 
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            icon={
              showPassword ? (
                <Icon name="eye slash outline" link onClick={handlerShowPassword} />
              ): <Icon name="eye" link onClick={handlerShowPassword} />
            }
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
             La contraseña debe tener al menos 6 caracteres.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input 
            type="text"
            name="userName"
            placeholder="Nombre"
            icon="user circle outline"
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text">
             Por favor, introduce un nombre válido
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Continuar
        </Button>
      </Form>

      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>
          Volver
        </p>
        <p>¿Ya tienes una cuenta?
          <span onClick={() => setSelectedForm("login")}> Iniciar sesión</span>
        </p>
      </div>

    </div>
  )
}

function defaultValueForm() {
  return{
    email: "",
    password: "",
    username: ""
  }
}
