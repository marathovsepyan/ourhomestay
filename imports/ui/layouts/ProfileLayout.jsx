import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';




export const ProfileLayout = ({content}) => (
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
                  <li>
                    <a href="#">Account Settings</a>
                  </li>
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
export class Footer extends Component {
	render (){
		return (
			<footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-3 col-lg-2">
              <ul className="footer-menu">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">How it works</a>
                </li>
                <li>
                  <a href="/aboutus" target="_blank">About us</a>
                </li>
                <li>
                  <a href="#">Login/signup</a>
                </li>
                <li>
                  <a href="#">CONTACT</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-4 col-lg-5">
              <address>
                <span><i className="icon-mail" /><a href="mailto:Info@ourhomestay.com">Info@ourhomestay.com</a></span>
                <span><i className="icon-phone" /><a href="tel:+1250-418-6812">+1 250-418-6812</a></span>
                <p>1031 St David St, Victoria,BC V8S 4Y7, Canada</p>
              </address>
            </div>
            <div className="col-sm-5 col-lg-5">
              <div className="home-stay-widget">
                <figure className="widget-logo"><img src="../images/footer-logo.png" alt /></figure>
                <p>Lorem ipsum dolor sit amet, consectetur adipisic ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <div className="subscriber">
                  <input type="email" placeholder="subscribe our newsletter" className="form-control" />
                  <input type="submit" className="btn primary-btn" defaultValue="Subscribe" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="bottom-footer">
          <div className="container">
            <span className="copy-right">© 2016 OurHomestay. All rights reserved</span>
            <div className="pull-right">
              <a href="#">Terms of service</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </section>
      </footer>
		)
	}
}