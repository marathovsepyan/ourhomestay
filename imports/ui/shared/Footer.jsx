import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';



// Header component - represents the whole app
export default class Footer extends Component {
    hasDashboardClass (){
      if(this.props.isAdmin)
        return 'dashboard-footer'
      else
        return '' 
    }

    hasDashboardContainer (){
      if(this.props.isAdmin)
          return 'fluid-container'
      else
          return '' 
    }

    
    renderFooter() {
        var footerContainer = ''
        if(Meteor.userId()) {
          if(Roles.subscription.ready()) {
            if(Roles.userIsInRole(Meteor.userId(), ['Student', 'Agency']))
                footerContainer = <FooterContainer />
          }
        } else {
            footerContainer = <FooterContainer />
        }

        return (
          <footer className={this.hasDashboardClass()}>
            {footerContainer}
            <section className="bottom-footer">
              <div className={this.hasDashboardContainer()}>
                <span className="copy-right">© 2016 OurHomestay. All rights reserved</span>
                <div className="pull-right">
                  <a href="#">Terms of service</a>
                  <a href="#">Privacy Policy</a>
                </div>
              </div>
            </section>
          </footer>
        );
    }

    render() {
      return this.renderFooter()
    }
};

export default createContainer(() => {
    if (Roles.userIsInRole(Meteor.userId(), ['Admin','Homestay','University residence'])){
      return {
          isAdmin         : true
      }
    } else {
      return {
          isAdmin         : false
      }
    }
    
}, Footer);

export class FooterContainer extends Component {
  render() {
    return (
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
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Login/signup</a>
              </li>
              <li>
                <a href="#">CONTACT</a>
              </li>
            </ul>
            {/*
            <div className="social-share">
              <a href="#" className="icon-facebook" />
              <a href="#" className="icon-twitter" />
              <a href="#" className="icon-linkedin" />
            </div>
            */}
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
                {/*
                  <div className="subscriber">
                    <input type="email" placeholder="subscribe our newsletter" className="form-control" />
                    <input type="submit" className="btn primary-btn" defaultValue="Subscribe" />
                  </div>
                */}
              </div>
            </div>
        </div>
      </div>
    )
  }
}