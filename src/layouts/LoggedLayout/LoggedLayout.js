import React from 'react';
import {Grid, GridColumn} from "semantic-ui-react";
import Routes from "../../routes/Routes";
import {BrowserRouter as Router} from "react-router-dom";
import "./LoggedLayout.scss";
import MenuLeft from "../../components/MenuLeft";
import TopBar from "../../components/TopBar/TopBar";
import firebase from "../../utils/firebase";
import "firebase/auth";


export default function LoggedLayout(props) {
  const {user} = props;


  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <GridColumn className="content" width={13}>
            <TopBar user={user}/>
            <Routes />
          </GridColumn>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <h2>Player</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  )
}
