import React, {useState} from 'react';
import {Icon,Button, Form, Input} from 'semantic-ui-react';
import {toast} from 'react-toastify';
import {reauthenticate} from '../../utils/Api';
import alertErrors from '../../utils/AlertErrors';
import firebase from '../../utils/firebase';
import 'firebase/auth';

export default function UserEmail(props) {
  const {user, setShowModal, setContentModal, setTitleModal} = props

  const onEdit = () => {
    setTitleModal("Cambiar Email")
    setContentModal(<ChangeEmailForm email={user.email} setShowModal={setShowModal} />);
    setShowModal(true);
  }

  return (
    <div className="user-email">
      <h3>Email:<span>{user.email}</span></h3>
      <Icon name="pencil" onClick={onEdit}  />
    </div>
  )
}


function ChangeEmailForm(props) {
  const {email, setShowModal} = props
  const [formData, setFormData] = useState({email: "", password: ""});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if(!formData.email) {
      toast.warning("El email no se ha cambiado")
    }else {
      setIsLoading(true);
      reauthenticate(formData.password).then(() => {
        const currentUser = firebase.auth().currentUser;
        currentUser.updateEmail(formData.email).then(() => {
          toast.success("Email actualizado.");
          setIsLoading(false);
          setShowModal(false);
          currentUser. sendEmailVerification().then(() => {
            firebase.auth().signOut();
          })
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

  return (
    <Form className="user-password" onSubmit={onSubmit} >
      <Form.Field>
        <Input 
          type="text"
          defaultValue={email}
          onChange={e => setFormData({ ...formData, email: e.target.value})}
        />
      </Form.Field>
      <Form.Field>
        <Input 
          placeholder="Contraseña"
          type={showPassword ? "text" : "password"}
          onChange={e => setFormData({ ...formData, password: e.target.value})}
          icon={
          <Icon 
            name={showPassword ? "eye slash outline" : "eye"} 
            link 
            onClick={() => setShowPassword(!showPassword)}
          />}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}> Actualizar email</Button>
    </Form>

  )

}
