import React, {useEffect, useState} from 'react';
import {map} from 'lodash';
import {toast} from 'react-toastify';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';
import firebase from '../../../utils/firebase';
import 'firebase/storage';

import './BasicSlider.scss';

export default function BasicSlider(props) {
  const {title, data, folderImage, urlName} = props;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    centerMode: true,
    className: "basic-slider__list"
  }

  return (
    <div className="basic-slider">
      <h2>{title}</h2>
      <Slider {...settings}>
         {map(data, item => (
           <RenderItem 
           key={item.id} 
           item={item} 
           folderImage={folderImage} 
           urlName={urlName} 
           />
         ))}
      </Slider>
    </div>
  )
}


function RenderItem(props){
  const {item, folderImage, urlName} = props;
  const [imageUrl , setImageUrl] = useState(null);
  
  useEffect(() => {
    firebase
      .storage()
      .ref(`${folderImage}/${item.banner}`)
      .getDownloadURL()
      .then(url => {
        setImageUrl(url);
      }).catch(() => {
        toast.error("No se pudo completar el proceso, intente mas tarde");
      })
  }, [item, folderImage])

  return (
    <Link to={`/${urlName}/${item.id}`}>
      <div className="basic-slider__list-item">
        <div 
          className="avatar"
          style={{backgroundImage: `url('${imageUrl}')`}}
        />
        <h3>{item.name}</h3>
      </div>
    </Link>
      
  )
}