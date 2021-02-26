import React, {useState, useEffect} from 'react';
import {map} from 'lodash'
import BannerHome from '../../components/BannerHome/BannerHome';
import BasicSlider from '../../components/Sliders/BasicSlider/BasicSlider';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

import './Home.scss';

const db = firebase.firestore(firebase);

export default function Home() {

  const [artist, setArtist] = useState([]);

  useEffect(() => {
    db.collection('Artists').get().then( response => {
      const arrayArtist = [];

      map(response?.docs, artist => {
        const data = artist.data();
        data.id = artist.id;
        arrayArtist.push(data);
      })
      setArtist(arrayArtist);
    })
  }, [])

  return (
    <>
      <BannerHome />
      <div className="home">
        <BasicSlider 
          title="Ultimos Artistas" 
          data={artist} 
          folderImage="Artists" 
          urlName="artist"
          />
      </div>
    </>
  )
}
