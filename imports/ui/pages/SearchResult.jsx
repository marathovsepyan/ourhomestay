import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
//import { Motion, spring } from 'react-motion';
import Blaze from 'meteor/gadicc:blaze-react-component';
import Modal from '../shared/Modal.jsx';
import Panel from '../shared/Panel.jsx';


// Homepage component - represents the whole app
export default class SearchResult extends Component {
   
    render() {
        return <Blaze template="SearchResult"/>
    }
}
