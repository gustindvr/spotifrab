import React, {useState, useEffect} from 'react';
import {Menu, Icon} from "semantic-ui-react";
import {Link, withRouter} from "react-router-dom";
import {isUserAdmin} from "../../utils/Api";
import BasicModal from "../Modal/BasicModal/BasicModal";

import "./MenuLeft.scss";

function MenuLeft(props) {
  const {user, location} = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    isUserAdmin(user.uid).then(response => {
      setUserAdmin(response);
    })
  }, [user]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  }

  const hanlderModal = (type) => {
    switch (type) {
      case "artist":
        setTitleModal("Nuevo Artista");
        setContentModal(<h2>Formulario nuevo artista</h2>)
        setShowModal(true);
        break;
        case "song":
          setTitleModal("Nueva Canción");
          setContentModal(<h2>Formulario nueva canción</h2>)
          setShowModal(true);
          break;
      default:
        setTitleModal(null);
        setShowModal(false);
        setContentModal(null);
        break;
    }
  }

  return (
    <>
      <Menu className="menu-left" vertical>
        <div className="top">
          <Menu.Item as={Link} to="/" active={activeMenu === "/"} onClick={handlerMenu}>
            <Icon name="home" /> Inicio
          </Menu.Item>
          <Menu.Item as={Link} to="/artist" active={activeMenu === "/artist"} onClick={handlerMenu}>
            <Icon name="music" /> Artistas
          </Menu.Item>
        </div>
        {userAdmin && (
          <div className="footer">
            <Menu.Item onClick={() => hanlderModal("artist")}>
              <Icon name="plus square outline" /> Nuevo Artista
            </Menu.Item>
            <Menu.Item onClick={() => hanlderModal("song")}>
              <Icon name="plus square outline" /> Nueva Canción
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

export default withRouter(MenuLeft);
