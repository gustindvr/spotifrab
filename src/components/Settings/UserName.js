import React, {useState} from 'react';
import {Icon ,Button, Form, Input} from 'semantic-ui-react';
import {toast} from 'react-toastify';
import firebase from '../../utils/firebase';
import 'firebase/auth';


export default function userName(props) {
  const {user, setShowModal, setTitleModal, setContentModal, setReloadApp} = props;

  const onEdit = () => {
    setTitleModal("Actualizar Nombre");
    setContentModal(<ChangeDisplayNameForm displayName={user.displayName} setShowModal={setShowModal} setReloadApp={setReloadApp} />)
    setShowModal(true);
    
  }


  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Icon name="pencil" onClick={onEdit}  />
    </div>
  )
}


function ChangeDisplayNameForm(props){
  const {displayName, setShowModal, setReloadApp} = props;
  const [formData, setFormData] = useState({displayName: displayName});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if(!formData.displayName || formData === displayName){
      setShowModal(false);
    } else {
      setIsLoading(true);
      firebase.auth().currentUser.updateProfile({displayName: formData.displayName}).then(() => {
        setReloadApp(prevState => !prevState)
        toast.success("Nombre actualizado");
        setIsLoading(false);
        setShowModal(false);
      }).catch(() => {
        toast.error("El nombre no pudo actualizarse correctamente");
        setIsLoading(false);
      })
    }
  }

  return(
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input 
          defaultValue={displayName}
          onChange={e => setFormData({displayName: e.target.value})}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading} >
        Actualizar Nombre
      </Button>
    </Form>
  )

}


