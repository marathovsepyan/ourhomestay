import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Footer from '../shared/Footer.jsx';


export const DashboardLayout = ({content}) => (
      <div>
      <Header/>
      {content}
      <Footer/>
      </div>
);
export default class Header extends Component {
	logoutUser (event) {
        Meteor.logout(function (error) {
            if (error) {
              alert("There was an error logging out!");
            } else {
              FlowRouter.go('/')
            }
        })
    }
	render (){
    let myProfile ='';
    let accountDetails  = <li>
                          <a href="#">Account Settings</a>
                        </li>;
    let homestayProfile = '';
    if(Roles.subscription.ready()) {
      if(Roles.userIsInRole(Meteor.userId(), 'Admin')) {
        myProfile = <li>
                    <a href="/admin/homestays">Dashboard</a>
                  </li>
      } else if(Roles.userIsInRole(Meteor.userId(), 'Homestay')) {
        myProfile = <li>
                      <a href="/homestay">My Profile</a>
                    </li>
      } else if(Roles.userIsInRole(Meteor.userId(), 'Agency')){
        myProfile = <li>
                    <a href="/agency/profile">My Profile</a>
                  </li>
      } else if(Roles.userIsInRole(Meteor.userId(), 'Student')){
        myProfile = <li>
                    <a href="/student/profile">My Profile</a>
                  </li>
      } else if(Roles.userIsInRole(Meteor.userId(), 'University residence')){
        myProfile = <li>
                    <a href="/universityresidence">My Profile</a>
                  </li>
      }

       if (Roles.userIsInRole(Meteor.userId(), 'Homestay')) {
            if(Meteor.user().profile.homestayId) {
              let homestyUrl= "/homestay/"+Meteor.user().profile.homestayId
              homestayProfile = <li>
                            <a href={homestyUrl}>Homestay</a>
                          </li>
            }
            accountDetails = <li>
                          <a href="/accountSettings">Account Settings</a>
                        </li>
          } else if (Roles.userIsInRole(Meteor.userId(), 'University residence')) {
            if(Meteor.user().profile.homestayId) {
              let homestyUrl= "/homestay/"+Meteor.user().profile.homestayId
              homestayProfile = <li>
                            <a href={homestyUrl}>University Residence</a>
                          </li>
            }
            accountDetails = <li>
                          <a href="/accountSettings">Account Settings</a>
                        </li>
          }

    }
		return (
			<header>
        <section className="top-header">
          <div className="container">
            <a href="/" className="main-logo"><img src="../images/logo.png" alt /></a>
            <aside className="right-menu">
              <ul>
                <li>
                  <a href="/aboutus" target="_blank">About us</a>
                </li>
                <li>
                  <a href="#">How it works</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
              </ul>
              <div className="signin-opt-drop dropdown">
                <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="../images/user.png" alt />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dLabel">
                  <li>
                    <a href="#">Hello User</a>
                  </li>
                  {myProfile}
                  <li>
                    <a href="/orders">Bookings</a>
                  </li>
                  {homestayProfile}
                  {accountDetails}
                  <li>
  	                <a href="#" onClick={this.logoutUser.bind(this)} >Signout</a>
  	              </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </header>
		)
	}
};
export default createContainer(() => {
    return {
        isAdmin         : Roles.userIsInRole(Meteor.userId(), 'Admin'),
        isAgency        : Roles.userIsInRole(Meteor.userId(), 'Agency'),
        isStudent       : Roles.userIsInRole(Meteor.userId(), 'Student'),
        isHomestay      : Roles.userIsInRole(Meteor.userId(), 'Homestay'),
        isUniversity    : Roles.userIsInRole(Meteor.userId(), 'University residence')
    }
}, Header);
