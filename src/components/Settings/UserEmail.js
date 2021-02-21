import React, {useState} from 'react';
import {Icon,Button, Form, Input} from 'semantic-ui-react';
import {toast} from 'react-toastify';
import {reauthenticate} from '../../utils/Api'

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
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(email)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = () => {
    if(!formData.email) {
      toast.warning("El email no se ha cambiado")
    }else {
      setIsLoading(true);
      reauthenticate(formData.password).then(() => {
        
      }).catch(err => {
        console.error(err);
      })
    }
  }

  return (
    <Form className="user-password" onSubmit={onSubmit} >
      <Form.Field>
        <Input 
          type="text"
          defaultValue={email}
        />
      </Form.Field>
      <Form.Field>
        <Input 
          placeholder="Contraseña"
          type={showPassword ? "text" : "password"}
          icon={
          <Icon 
            name={showPassword ? "eye slash outline" : "eye"} 
            link 
            onClick={() => setShowPassword(!showPassword)}
          />}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}> Actualizar E-mail</Button>
    </Form>

  )

}
