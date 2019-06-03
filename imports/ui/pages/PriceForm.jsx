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

export default class PriceForm extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        error : "",
        success : ""
      };
    }
  
    handleSubmit(event) {
      event.preventDefault();
      var self = this;
      this.setState({'error' : ''})
      this.setState({'success' : ''})
      // var dailyPrice = ReactDOM.findDOMNode(this.refs.dailyPrice).value.trim(),
      //     weeklyPrice = ReactDOM.findDOMNode(this.refs.weeklyPrice).value.trim();
      var dailyPrice  = $(event.currentTarget).find('#dailyPrice').val().trim(),
          weeklyPrice = $(event.currentTarget).find('#weeklyPrice').val().trim();
      if(!dailyPrice && !weeklyPrice) {
        self.setState({'error':'No data entered'});
      } else {
        const options = {
          dailyPrice    : Number(dailyPrice),
          weeklyPrice   : Number(weeklyPrice)
        }
        const updateHomestay_args = {
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
        return(
                <div className="col-sm-8">
                  <div className="error-message">{this.state.error} </div>
                </div>
              )
      }
      if (this.state.success) {
        return (
          <div className="col-sm-8">
            <div className="success-message">{this.state.success}</div>
          </div>
        )
      }
    }
    renderPriceform () {
      return (
        <Validation.Form className="form-horizontal" id="form-price" role="form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
          {this.getMessage()}
          </div>
          <div className="form-group">
            <label htmlFor="dailyPrice" className="col-sm-4 control-label">Daily Price ($) <i className="semi">:</i></label>
            <div className="col-sm-3">
              <Validation.Input
                type="text"
                className="form-control"
                name="dailyPrice"
                ref="dailyPrice"
                id="dailyPrice"
                placeholder="Eg:- 225"
                validations={[
                  {
                    rule: 'isDecimal',
                    errorMessage: 'Enter a valid daily price.'
                  },
                  {
                    rule: 'isValidPrice',
                    errorMessage: 'Only 2 decimal point is allowed.'
                  },
                  {
                    rule: 'isMinPrice',
                    errorMessage:'Price should be min $1.'
                  }
                ]}
                value={(this.props.homestay.dailyPrice)?(this.props.homestay.dailyPrice).toString() : "0"} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="weeklyPrice" className="col-sm-4 control-label">Weekly Price ($) <i className="semi">:</i></label>
            <div className="col-sm-3">
              <Validation.Input
                type="text"
                className="form-control"
                id="weeklyPrice"
                name="weeklyPrice"
                ref="weeklyPrice"
                placeholder="Eg:- 550"
                validations={[
                  {
                    rule: 'isDecimal',
                    errorMessage: 'Enter a valid weekly price.'
                  },
                  {
                    rule: 'isValidPrice',
                    errorMessage: 'Only 2 decimal point is allowed.'
                  },
                  {
                    rule: 'isMinPrice',
                    errorMessage:'Price should be min $1.'
                  }
                ]}
                value={(this.props.homestay.weeklyPrice)? (this.props.homestay.weeklyPrice).toString() : "0"} />
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="col-sm-4" />
            <div className="col-sm-8">
              <Validation.Button className="btn primary-btn lg" type="submit" value="Update Changes" />
            </div>
          </div>
        </Validation.Form>
      )
    }
    render () {
      return this.renderPriceform()
    }
  }