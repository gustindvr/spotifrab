import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

import './Artist.scss';

const db = firebase.firestore(firebase);

function Artist(props) {
  const {match} = props;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    db.collection("Artists").doc(match?.params?.id).get().then( response => {
      setArtist(response.data());
    })
  }, [match])

  return (
    <div>
      <h1>Artist Page......</h1>
    </div>
  )
}


export default withRouter(Artist);