import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Header from '../shared/Header.jsx';

export const AuthLayout = ({content}) => (
    <div>
        {content}
        <Footer />
    </div>
);

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