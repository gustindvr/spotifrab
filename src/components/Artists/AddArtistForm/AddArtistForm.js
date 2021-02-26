import React, {useState, useCallback} from 'react';
import {Form, Input, Button, Image} from 'semantic-ui-react';
import {useDropzone} from 'react-dropzone';
import {toast} from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../utils/firebase';
import 'firebase/storage';
import 'firebase/firestore';
import noImage from '../../../assets/svg/NoImage.svg';

import './AddArtistForm.scss';

const db = firebase.firestore(firebase);

export default function AddArtistForm(props) {
  const {setShowModal} = props;
  const [formData, setFormData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = useCallback(
    acceptedFile => {
      const file = acceptedFile[0];
      setFile(file);
      setBanner(URL.createObjectURL(file));
    }
  )

  const {getRootProps, getInputProps} = useDropzone ({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop
  })

  const uploadImage = fileName =>{
    const ref = firebase.storage().ref().child(`Artists/${fileName}`);
    return ref.put(file);
  }


  const onSubmit = () => {
    
    if(!formData.name){
      toast.warning("Por favor ingrese un nombre"); 
    } else if(!file) {
      toast.warning("Por favor ingresa la imagen del artista");
    }else{
      setIsLoading(true);
      const fileName = uuidv4();
      uploadImage(fileName).then(() => {
        db.collection("Artists")
        .add({name: formData.name, banner: fileName})
        .then(() => {
          toast.success("Artista creado correctamente");
          resetForm()
          setIsLoading(false);
          setShowModal(false)
        })
        .catch(() => {
          toast.error("No se pudo completar el proceso, intente de nuevo mas tarde");
          setIsLoading(false);
        })
      }).catch(() => {
        toast.error("Hubo un error al subir la imagen, por favor intente mas tarde");
        setIsLoading(false);
      })
      //setShowModal(false);
    }

  }

  const resetForm = () => {
    setFormData(initialValueForm())
    setFile(null);
    setBanner(null);
  }


  return (
    <Form className="add-artist-form" onSubmit= {onSubmit}>
      <Form.Field className="artist-banner">
        <div 
        {...getRootProps()} 
        className="banner" 
        style={{backgroundImage: `url('${banner}')`}}
        />
        <input {...getInputProps()} />
          {!banner && <Image src={noImage} />}
        
      </Form.Field>
      <Form.Field className="artist-avatar">
        <div
        className="avatar"  
        style={{backgroundImage: `url('${banner ? banner : noImage}')`}}
        />
      </Form.Field>
      <Form.Field>
        <Input 
          placeholder="Nombre del artista"
          onChange={e => setFormData({name: e.target.value})}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading} >
        Cargar Artista
      </Button>
    </Form>
  )
}

function initialValueForm(){
  return {
    name: ""
  };
}
