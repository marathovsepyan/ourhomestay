import React, {Component} from 'react';

import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

export default class UniversityProfile extends Component{
	componentDidMount() {
		if(Roles.subscription.ready()) {
			if (!Roles.userIsInRole(Meteor.userId(), 'University residence')) {
				FlowRouter.go('noaccess')
			}
		}
	}

	render () {
		return (
			<section>
			   <h2> ToDo : University Profile </h2>
			</section>
		);
	}
};