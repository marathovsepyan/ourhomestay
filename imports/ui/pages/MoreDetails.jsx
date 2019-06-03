import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import {Meteor} from 'meteor/meteor';

export default class MoreDetails extends Component {
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
            <div className="header-wrap">More About ourHomestay</div>
            <div className="user-form-wrap">
                <div className="row">
                  <div className="col-sm-12">
                    
                    <p>OurHomestay is the best way to find a great homestay in the city you plan to study in. All homestays on OurHomestay have been inspected and are rated by the actual students who have stayed in them.</p>
                      <p>  Simply enter your search terms and you will receive a list of homestays that meet your needs. The homestay you may select may have several students looking at it so be sure to respond to homestay enquiries quickly and select backup options when prompted.</p>

                    
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  };
  