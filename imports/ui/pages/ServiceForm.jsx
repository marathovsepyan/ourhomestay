import React, {Component, PropTypes} from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';

var Validation = require('react-validation');
var validator = require('validator');

import { CountryList } from './../../helper/constants.js';
import { CityList } from './../../helper/constants.js';
import { FoodRestrictions } from './../../helper/constants.js';
import { Meals } from './../../helper/constants.js';

export default class ServiceForm extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        error : "",
        success : ""
      };
    }
  
    handleSubmit(event){
      event.preventDefault();
      var self = this;
      var serviceArray = [];
      this.setState({'error' : ''})
      this.setState({'success' : ''})
      $(event.currentTarget).find("input.services[type=checkbox]:checked").each(function() {
        serviceArray.push($(this).val());
      });
      if(serviceArray.length <=0) {
        self.setState({'error':'Please select any services'});
      } else {
        var options = {
          services      : serviceArray
        }
        let updateHomestay_args = {
          homestayId : self.props.homestayId,
          options
        }
        updateHomestay.call(updateHomestay_args, (error, res) => {
          if (error) {
              self.setState({'error':error.reason});
          } else {
              self.setState({'success':'Successfully updated homestay'});
          }
        })
      }
    }
  
    getMessage() {
      if(this.state.error) {
        return (<div className="col-sm-8">
                              <div className="error-message">{this.state.error} </div>
                            </div>)
      }
      if (this.state.success) {
        return(<div className="col-sm-8">
                        <div className="success-message">{this.state.success}</div>
                      </div>)
      }
    }
  
    radioSwitch(event) {
      $(event.currentTarget).parent().find('label').removeClass('active');
      $(event.currentTarget).addClass('active');
    }
  
    //custom checkbox
    customCheckbox(event){
        event.preventDefault();
        $(event.currentTarget).find('label').toggleClass('active');
        if($(event.currentTarget).find('label').hasClass('active')){
            $(event.currentTarget).find('input').prop('checked', true);
        }else{
            $(event.currentTarget).find('input').prop('checked', false);
        }
    }
    renderServiceForm() {
      let luggage = false;
      let wifi = false;
      let lockers = false;
      if(this.props.homestay.hasOwnProperty("services")) {
        for (var i=0; i< this.props.homestay.services.length; i++) {
          if (this.props.homestay.services[i] === "Luggage Storage") {
            luggage = true
          } else if(this.props.homestay.services[i] === "Free Wifi") {
            wifi = true
          } else if (this.props.homestay.services[i] === "Lockers") {
            lockers = true
          }
        }
      }
      return (
        <form className="form-horizontal" id="form-services" role="form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
           {this.getMessage()}
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Luggage Storage <i className="semi">:</i></label>
            <div className="col-sm-8">
              <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
                <label className={(luggage) ? "active" : ""}>
                  <input type="checkbox" className="services" name="services[]" value="Luggage Storage" ref="services" defaultChecked={(luggage) ? "checked" : ""} /> Yes
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Free WiFi <i className="semi">:</i></label>
            <div className="col-sm-8">
              <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
                <label className={(wifi) ? "active" : ""}>
                  <input type="checkbox" className="services" name="services[]" value="Free Wifi" ref="services"  defaultChecked={(wifi) ? "checked" : ""} /> Yes
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Lockers <i className="semi">:</i></label>
            <div className="col-sm-8">
              <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
                <label className={(lockers) ? "active" : ""}>
                  <input type="checkbox" className="services" name="services[]" value="Lockers" ref="services" defaultChecked={(lockers) ? "checked" : ""} /> Yes
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="col-sm-4" />
            <div className="col-sm-8"><button className="btn primary-btn lg" disabled={this.state.servicesBtnDisable} type="submit">Update Changes</button></div>
          </div>
        </form>
      )
    }
  
    render () {
      return this.renderServiceForm()
    }
  }
  