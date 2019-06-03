import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

export default class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error   : "",
      success : ""      
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <section className="main-content-wrapper signup">
        <div className="container">
          <div className="user-accounts-wrapper">
            <div className="user-logo"><a href="/"><img src="../images/logo.png" alt /></a></div>
            <div className="header-wrap">About Us</div>
            <div className="user-form-wrap">
                <div className="row">
                  <div className="col-sm-12">
                    <p>ourHomestay is a registered Canadian company and a member of the islBooking family.</p>
                    <p>ourHomestay is an innovative system designed to give students and schools access to great homestays across Canada and around the world. Please feel free to contact us with any questions you may have whether you would like to become a host or find your homestay.</p>

                    <p>Contact: 905-925-4248</p>
                    <p>info@islBooking.com</p>
                    <p>Toronto, Canada</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  };
  