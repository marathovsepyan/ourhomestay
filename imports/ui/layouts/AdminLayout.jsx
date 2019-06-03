import React, {Component, PropTypes} from 'react';




export const AccountLayout = ({content}) => (
      <div> 
      <Header/>
          {content}
      <Footer/>
      </div>
);
export class Header extends Component {
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
		return (
      <header className="db-header">
        <section className="top-header">
          <div className="fluid-container">
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
                  <li>
                    <a href="/admin/homestays">Dashboard</a>
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

export class Footer extends Component {
	render (){
		return (
			<footer className="dashboard-footer">
        <section className="bottom-footer">
          <div className="fluid-container">
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