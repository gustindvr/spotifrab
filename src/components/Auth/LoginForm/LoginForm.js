import React, {useState} from 'react';
import {Button, Icon, Form, Input} from "semantic-ui-react";
import {toast} from "react-toastify";
import {validateEmail} from "../../../utils/Validations";
import firebase from "../../../utils/firebase";
import "firebase/auth";

import "./LoginForm.scss";



export default function LoginForm(props) {

  const {setSelectedForm} = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const handlerShowPassword= () => {
    setShowPassword(!showPassword);
  }

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if(!validateEmail(formData.email)){
      errors.email = true;
      formOk = false
    }

    if(formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }

    setFormError(errors);

    if(formOk){
      setIsLoading(true);
      firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).then(Response => {
        setUser(Response.user);
        setUserActive(Response.user.emailVerified);
        if(!Response.user.emailVerified){
          toast.warning("Por favor confirma tu cuenta antes de iniciar sesión")
        }
      })
      .catch(err => {
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }

  }

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="login-form">
      <h1>Musica para Todos y Todas</h1>

      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
          type="text"
          name="email"
          placeholder="Correo Electrónico"
          icon="mail outline"
          error={formError.email} 
          />
          {formError.email &&(
            <span>
              Por favor, introduce un correo electronico válido
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
            <span>
              La contraseña debe tener al menos 6 caracteres
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Iniciar Sesión
        </Button>
      </Form>

      {!userActive && (
        <ButtonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}

      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}> Volver</p>
        <p>
          ¿No tienes cuenta?
          <span onClick={() => setSelectedForm("register")}> Click Aquí</span>
        </p>
      </div>
    </div>
  )
}

function ButtonResetSendEmailVerification(props) {
  const {user, setIsLoading, setUserActive} = props;

  const resendVerificationEmail = () => {
    user.sendEmailVerification().then(() => {
      toast.success("Se ha enviado el email de verificación")
    })
    .catch(err => {
      handlerErrors(err.code)
    }) 
    .finally(() => {
      setIsLoading(false);
      setUserActive(true);
    })
  }
  
  return (
    <div className="resend-verification-email">
      <p>
        Si no has recibido el email de verificación puedes volver a enviarlo haciendo <span onClick={resendVerificationEmail}>Click Aquí</span>
      </p>
    </div>
  )
}

function handlerErrors(code){
  switch ((code)) { 
    case "auth/wrong-password":
      toast.warning("El usuario o la contraseña son incorrecto.");
      break;
    case "auth/too_many_attempts_try_later":
      toast.warning("Has enviado demasiadas solicitudes de reenvio de email en muy poco tiempo");
      break;
    case "auth/user-not-found":
      toast.warning("El usuario o la contraseña son incorrectos");
    default:
      break;
  }
}

function defaultValueForm() {
  return {
    email:"",
    password:""
  }
}
