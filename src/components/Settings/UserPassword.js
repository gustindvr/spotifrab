import React, {useState} from 'react';
import {Icon, Form, Input, Button} from 'semantic-ui-react';
import {toast} from 'react-toastify';
import firebase from '../../utils/firebase';
import 'firebase/auth';
import { reauthenticate } from '../../utils/Api';
import alertErrors from '../../utils/AlertErrors'

export default function UserPassword(props) {
  const {setShowModal, setContentModal, setTitleModal } = props;
  
  const onEdit = () => {
    setTitleModal("Cambiar Contraseña")
    setContentModal(<ChangePasswordForm setShowModal={setShowModal} />);
    setShowModal(true);
  }

  return (
    <div className="user-password">
        <h3>Contraseña: <span>**** **** ****</span></h3>
        <Icon name="pencil" onClick={onEdit} />
    </div>
  )
}

function ChangePasswordForm(props){
  const {setShowModal} = props;
  const [viewPasswordPrev, setViewPasswordPrev] = useState(false);
  const [viewPasswordNew, setViewPasswordNew] = useState(false);
  const [viewPasswordReNew, setViewPasswordReNew] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    reNewPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)


  const onSubmit = () => {
    if(!formData.currentPassword || !formData.newPassword || !formData.reNewPassword){
      toast.warning("Por favor, complete todos los campos")
    }else if(formData.currentPassword == FormData.newPassword){
      toast.warning("La nueva contraseña no puede ser igual a la anterior")
    }else if(formData.newPassword !== formData.reNewPassword){
      toast.warning("La nueva contraseña debe coincidir en los dos campos")
    }else if(formData.newPassword.length < 6 ){
      toast.warning("La contraseña debe tener 6 caracteres como minimo")
    }else{
      setIsLoading(true);
      reauthenticate(formData.currentPassword).then(() => {
        const currentUser = firebase.auth().currentUser;
        currentUser.updatePassword(formData.newPassword).then(() => {
          toast.success("Contraseña actualizada.");
          setIsLoading(false);
          setShowModal(false);
          firebase.auth().signOut();
        }).catch(err => {
          alertErrors(err?.code);
          setIsLoading(false);
        })
      }).catch(err => {
        alertErrors(err?.code);
        setIsLoading(false);
      })
    }
  }


  return(
    
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input 
        type={viewPasswordPrev ? "text" : "password" }
        placeholder="Contraseña Actual"
        icon={<Icon 
          name={viewPasswordPrev ? "eye slash outline" : "eye"}  
          onClick={() => setViewPasswordPrev(!viewPasswordPrev)}  
          link />}
          onChange={ e => setFormData({ ...formData, currentPassword: e.target.value})}
        /> 
      </Form.Field>
      <Form.Field>
        <Input 
        type={viewPasswordNew ? "text" : "password" }
        placeholder="Contraseña nueva"
        icon={<Icon 
          name={viewPasswordNew ? "eye slash outline" : "eye"}
          onClick={() => setViewPasswordNew(!viewPasswordNew)}   
          link />}
        onChange={ e => setFormData({ ...formData, newPassword: e.target.value})}  
        /> 
      </Form.Field>
      <Form.Field>
        <Input 
        type={viewPasswordReNew ? "text" : "password" }
        placeholder="Reingrese contraseña nueva"
        icon={<Icon 
          name={viewPasswordReNew ? "eye slash outline" : "eye"}
          onClick={() => setViewPasswordReNew(!viewPasswordReNew)} 
          link />}
        onChange={ e => setFormData({ ...formData, reNewPassword: e.target.value})} 
        /> 
      </Form.Field>
      <Button type="submit" loading={isLoading} >
        Cambiar Contraseña
      </Button>
    </Form>
  )

}
