import {toast} from 'react-toastify';

export default function alertErrors(type){
  switch (type) {
    case "auth/wrong-password":
      toast.warning("La contraseña ingresada no es válida")
      break;

    case "auth/email-alredy-in-use":
      toast.warning("El email ingresado ya está en uso")
      break;

    default:
      toast.warning("Error del servidor, intente nuevamente mas tarde")
      break;
  }
}