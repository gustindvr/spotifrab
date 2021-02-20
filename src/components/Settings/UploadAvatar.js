import React, {useState, useEffect} from 'react';
import {Image} from "semantic-ui-react";
import NoAvatar from "../../assets/svg/avatarX.svg"; 


export default function UploadAvatar(props) {
  const {user} = props;
  //const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  return (
    <div className="user-avatar">
      <Image src={NoAvatar} />
    </div>
  )
}
//avatarUrl ? avatarUrl : 