import React, {Component, PropTypes} from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import CircularProgress from 'material-ui/CircularProgress'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var createFragment = require('react-addons-create-fragment');

import Sidebar    from '../../shared/Sidebar.jsx';
import { createSettings,updateSettings } from '../../../api/admin/settings/methods.js';
import { Settings } from '../../../api/admin/settings/settings.js';


var Validation = require('react-validation');
var validator = require('validator');

// Extend Validation with custom rules 
Validation.extendErrors({
    
    isHour : {
      rule: function(value) {
            return Boolean(validator.trim(value).match(/^[0-9\s]+$/));
        }
    }
});

export default class SettingsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      success:''
    };
  }
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
  componentDidMount() {
  }
 
  getMessage() {
    if(this.state.error) {
      return ( <div className="row">
                    <div className="col-sm-12">
                      <div className="error-message">
                        {this.state.error}
                      </div>
                    </div>
                  </div>
              )
    }
    if (this.state.success) {
      return ( <div className="row">
                    <div className="col-sm-12">
                      <div className="success-message">
                        {this.state.success}
                      </div>
                    </div>
                  </div>
              )
    }
  }

  handleSubmit(event){
    event.preventDefault();
    var self = this;
    self.setState({'error':''});
    self.setState({'success':''});
    const commission_amount     = $(event.currentTarget).find('#commission_amount').val().trim(),
          commission_amount_week = $(event.currentTarget).find('#commission_amount_week').val().trim(),
          homestay_processing_time = $(event.currentTarget).find('#homestay_processing_time').val().trim(),
          booking_cancellation = $(event.currentTarget).find('#booking_cancellation').val().trim();

     // create setting object
    var settings = {
        commission_amount: parseFloat(parseFloat(commission_amount).toFixed(2)),
        commission_amount_week: parseFloat(parseFloat(commission_amount_week).toFixed(2)),
        homestay_processing_time: Number(homestay_processing_time),
        booking_cancellation: Number(booking_cancellation)
    }
    // if already have settings just update
    // else create new
    if(this.props.settings){
      settings['_id'] = this.props.settings._id;

      updateSettings.call(settings, (error, response) => {
            if (error) {
                self.setState({'error':error.reason});
            } else { 
                self.setState({'success':'Successfully saved'});
            }
        });
    } else {
      createSettings.call(settings, (error, response) => {
          if (error) {
              self.setState({'error':error.reason});
          } else { 
              self.setState({'success':'Successfully saved'});
          }
      });
    }
  }

  renderForm () {
    return (
          <div className="user-accounts-wrapper">
            <div className="header-wrap">Settings</div>
            <Validation.Form id="form-settings" className="user-form-wrap" role="form" onSubmit={this.handleSubmit.bind(this)}>
              {this.getMessage()}
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="commission_amount" className="control-label">Commission amount</label>
                    <Validation.Input 
                      type="text" 
                      className="form-control" 
                      id="commission_amount" 
                      name="commission_amount" 
                      ref="commission_amount" 
                      blocking="input"
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter value'
                        },
                        {
                          rule : 'isDecimal',
                          errorMessage: "Enter a valid amount"
                        }
                      ]}
                      value ={this.props.settings ? this.props.settings.commission_amount.toString() : ''} 
                      placeholder="Enter Value" />
                  </div> 
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="commission_amount_week" className="control-label">Commission amount/week</label>
                    <Validation.Input 
                      type="text" 
                      className="form-control" 
                      id="commission_amount_week" 
                      name="commission_amount_week" 
                      ref="commission_amount_week" 
                      blocking='input'
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter value'
                        },
                        {
                          rule : 'isDecimal',
                          errorMessage: "Enter a valid amount"
                        }
                      ]} 
                      value ={this.props.settings ? this.props.settings.commission_amount_week.toString() : ''} 
                      placeholder="Enter Value" />
                  </div> 
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="homestay_processing_time" className="control-label">Processing time (Hours)</label>
                    <Validation.Input 
                      type="text" 
                      className="form-control" 
                      id="homestay_processing_time" 
                      name="homestay_processing_time" 
                      ref="homestay_processing_time" 
                      blocking='input'
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter value'
                        },
                        {
                          rule : 'isNumber',
                          errorMessage: "Enter time in Hours"
                        }
                      ]} 
                      value ={this.props.settings ? this.props.settings.homestay_processing_time.toString() : ''} 
                      placeholder="Time in Hours" />
                  </div> 
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="booking_cancellation" className="control-label">Booking cancellation (Days)</label>
                    <Validation.Input 
                      type="text" 
                      className="form-control" 
                      id="booking_cancellation" 
                      name="booking_cancellation" 
                      ref="booking_cancellation" 
                      blocking='input'
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter value'
                        },
                        {
                          rule : 'isNumber',
                          errorMessage: "Enter number of days"
                        }
                      ]} 
                      value ={this.props.settings ? this.props.settings.booking_cancellation.toString() : ''} 
                      placeholder="Time in Hours" />
                  </div> 
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group text-center">
                    <Validation.Button type="submit" id="settingsButton" className="btn primary-btn lg btn-block" value="Save" />
                  </div>
                </div>
              </div>
            </Validation.Form>
          </div>
    )
  }

  render() {
    return (
       <section className="dashboard-content-wrapper">
        < Sidebar />
        <aside className="right-side-wrapper">
          <div className="dashboard-content">
            {this.renderForm()}
          </div>
        </aside>
      </section>
    );
  }
};
SettingsView.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
export default createContainer(() => {
    if(!Roles.userIsInRole(Meteor.userId(), 'Admin'))
      FlowRouter.go('noaccess')
    const SeetingsHandle = Meteor.subscribe('settings');
    return {
        currentUser     : Meteor.user(),
        agencyLoading   : !SeetingsHandle.ready(),
        settings        : Settings.findOne()
      }
}, SettingsView);

