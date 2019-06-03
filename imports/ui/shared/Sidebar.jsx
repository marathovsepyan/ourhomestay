import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

export default class Sidebar extends Component {
	constructor(props) {
    super(props);
		this.state = {
			currentPage 	: FlowRouter.getRouteName(),
			agencyClass 	: "",
			studentClass 	: "",
			homestayClass 	: "",
			universityClass : "",
			createUserClass : "",
			settingsClass : ""
		};
	}    

	componentDidMount() {
		if (this.state.currentPage === "admin-listAgency")
			this.state.agencyClass = "active"
		else if (this.state.currentPage === "admin-listStudents")
			this.state.studentClass = "active"
		else if (this.state.currentPage === "admin-listHomestay")
			this.state.homestayClass = "active"
		else if (this.state.currentPage === "admin-listUniversity")
			this.state.universityClass = "active"
		else if (this.state.currentPage === "admin-adduser")
			this.state.createUserClass = "active"
		else if (this.state.currentPage === "admin-settings")
			this.state.settingsClass = "active"
	}

  	render() {
	    return(
			<aside className="left-side-bar">
				<ul>
					<li><a className={this.state.homestayClass} href="/admin/homestays"><i className="icon-homestay" />Homestays</a></li>
					<li><a className={this.state.agencyClass} href="/admin/agency"><i className="icon-schools" />Agency</a></li>
					<li><a className={this.state.studentClass} href="/admin/students"><i className="icon-students" />Students</a></li>
					<li><a className={this.state.universityClass} href="/admin/universityResidence"><i className="icon-university" />University Residence</a></li>
					<li><a className={this.state.createUserClass} href="/admin/createuser"><i className="icon-add-user" />Create User</a></li>
					<li><a className={this.state.settingsClass} href="/admin/settings"><i className="icon-add-user" />Settings</a></li>
				</ul>

			</aside>
	    );
  	}
}