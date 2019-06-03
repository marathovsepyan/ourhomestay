import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { CountryList } from './../../helper/constants.js';
import { CityList } from './../../helper/constants.js';
import Blaze from 'meteor/gadicc:blaze-react-component';
import ReactDOM from 'react-dom';
// import faker from 'faker';

// let avatar = faker.image.avatar();

// Header component - represents the whole app
export default class Header extends Component {
    constructor(props) {
      super(props);

      this.state = {
        dashboardheader: '',
        isAdmin : false
      };
    }
    componentDidMount() {
      if(Roles.subscription.ready()) {
        if (Roles.userIsInRole(Meteor.userId(), 'Admin'))
          this.setState({'isAdmin':true})
      }
    }

    logoutUser (event) {
        Meteor.logout(function (error) {
            if (error) {
              alert("There was an error logging out!");
            } else {
              FlowRouter.go('/')
            }
        })
    }
    hasDashboardHeader(){
        var route_name = 'admin-dashboard';
        if(this.props.isAdmin)
          return 'db-header'
        else
          return false
    }

    userRoute() {
      if(Roles.subscription.ready()) {
        if (this.props.isAdmin)
          return '/'
        else if (this.props.isStudent)
          return '/'
        else if (this.props.isHomestay)
          return '/homestay'
        else if (this.props.isAgency)
          return '/'
        else if (this.props.isUniversity)
          return '/universityResidence'
      }
    }
    renderHeader () {
        var dropdown = '';
        var searchContainer ='';
        if (this.props.UserId) {
          let myProfile       = '';
          let homestayProfile = '';
          let accountDetails  = <li>
                          <a href="#">Account Settings</a>
                        </li>;
          if(this.props.isAdmin) {
            myProfile = <li>
                        <a href="/admin/homestays">Dashboard</a>
                      </li>
          } else if(this.props.isHomestay) {
            myProfile = <li>
                          <a href="/homestay">My Profile</a>
                        </li>
          } else if(this.props.isAgency){
            myProfile = <li>
                        <a href="/agency/profile">My Profile</a>
                      </li>
          } else if(this.props.isStudent){
            myProfile = <li>
                        <a href="/student/profile">My Profile</a>
                      </li>
          } else if(this.props.isUniversity){
            myProfile = <li>
                        <a href="/universityresidence">My Profile</a>
                      </li>
          }
          if (this.props.isHomestay) {
            if(Meteor.user().profile.homestayId) {
              let homestyUrl= "/homestay/"+Meteor.user().profile.homestayId
              homestayProfile = <li>
                            <a href={homestyUrl}>Homestay</a>
                          </li>
            }
            accountDetails = <li>
                          <a href="/accountSettings">Account Settings</a>
                        </li>
          } else if (this.props.isUniversity) {
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

          dropdown = <div className="signin-opt-drop dropdown">
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
          if(Roles.subscription.ready()) {
            if (Roles.userIsInRole(Meteor.userId(), ['Student', 'Agency']))
              searchContainer = <SearchContainer />
          }
        }  else {
          dropdown = <div className="signin-opt">
                            <a className="user-login " href="/login">Login <i className="icon-right-bullet" /></a>
                            <a className="user-register" href="/register">Sign up <i className="icon-right-bullet" /></a>
                          </div>
          searchContainer = <SearchContainer />
        }
        return (
                  <header className={this.hasDashboardHeader()}>
                    <section className="top-header">
                      <div className="fluid-container">
                        <a href={this.userRoute()} className="main-logo"><img src="../images/logo.png" alt /></a>
                        <aside className="right-menu">
                          <ul>
                            <li>
                              <a href="/aboutus" target="_blank">About us</a>
                            </li>
                            <li>
                              <a href="#">How it works</a>
                            </li>
                            <li>
                              <a href="mailto:info@islBooking.com">Contact us</a>
                            </li>
                          </ul>

                          {dropdown}

                        </aside>
                      </div>
                    </section>
                    {searchContainer}
                  </header>
        );
    }
    render() {
        return this.renderHeader()
    }
};

Header.propTypes = {
    DashboardHeader: PropTypes.string.isRequired,
    UserId : PropTypes.string
};

export default createContainer(() => {
    return {
        DashboardHeader : 'db-header',
        UserId          : Meteor.userId(),
        isAdmin         : Roles.userIsInRole(Meteor.userId(), 'Admin'),
        isAgency        : Roles.userIsInRole(Meteor.userId(), 'Agency'),
        isStudent       : Roles.userIsInRole(Meteor.userId(), 'Student'),
        isHomestay      : Roles.userIsInRole(Meteor.userId(), 'Homestay'),
        isUniversity    : Roles.userIsInRole(Meteor.userId(), 'University residence')
    }
}, Header);

export class SearchContainer extends Component {
  componentDidMount () {
     let searchAfterTwoWeeks = new Date(+new Date + 18144e5);
      // initialise start date timepicker
      $('#searchStartDate').datetimepicker({
          format : 'YYYY-MM-DD',
          //daysOfWeekDisabled: [0,1,2,3,4,6], // enable only fridays
          minDate : searchAfterTwoWeeks // enable only dates 2 weeks after current date
      }).on('dp.change', function (selected) {
        var minDate = new Date(selected.date.valueOf());
            minDate.setDate(minDate.getDate() + 1);
        if ($('#searchStartDate').val()){
          $('#searchEndDate').data("DateTimePicker").minDate(minDate);
        }
          // var minDate = new Date(selected.date.valueOf());
      });
      let searchNextDate = new Date($('#searchStartDate').val());
      searchNextDate.setDate(searchNextDate.getDate() + 1);
      // initialise end date timepicker
      $('#searchEndDate').datetimepicker({
          format : 'YYYY-MM-DD',
          minDate : searchNextDate // enable date after start date only
      });
    //search toggle section
            $('.search-toggle-btn').click(function () {
                $(this).toggleClass('open');
                $('.search-container').slideToggle();
            });

            //popup
            $('.video-play-btn').click(function(){
               $('.overlay').fadeIn(100);
                $('#videoPopup').delay(100).fadeIn(400);
            });
            //close popup
            $('.close-btn, .overlay').click(function(){
                //video stop
                var video = $("#videoPopup iframe").attr("src");
                $("#videoPopup iframe").attr("src","");
                $("#videoPopup iframe").attr("src",video);

                $('.popup-box').fadeOut(100);
                $('.overlay').delay(100).fadeOut(300);
            });

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
  // Function to style radio button on Click event
  radioSwitch(event) {
    $(event.currentTarget).parent().find('label').removeClass('active');
    $(event.currentTarget).addClass('active');
  }
  // Show dropdown
  customSelect(event) {
    $(event.currentTarget).parent().find('.drop-down-list').stop( true, true ).delay(10).slideToggle();
  }
  // select li value
  selectDropDown(event) {
    var parent = $(event.currentTarget).parent().parent();
    parent.find('.active-list').addClass('added');
    parent.find('.active-list').trigger("click");
    parent.find('.active-list').text( $(event.currentTarget).text() ).removeClass('opened');
    parent.find('input.list-field').val($(event.currentTarget).html() );
  }

  handleSearch(event){
    let query = {},
        filter_country = ReactDOM.findDOMNode(this.refs.filter_country).value.trim(),
        filter_city = ReactDOM.findDOMNode(this.refs.filter_city).value.trim(),
        filter_gender = ReactDOM.findDOMNode(this.refs.filter_gender).value.trim(),
        filter_smoker = ReactDOM.findDOMNode(this.refs.filter_smoker).value.trim()

      
    console.log("guery11111", query);
    
    if(filter_country != 'View All')
      query['country'] = filter_country
    if(filter_city != 'View All')
      query['city'] = filter_city
    if(filter_gender != 'View All')
      query['tenant_gender'] = filter_gender
    if(filter_smoker != 'View All')
      query['tenant_smoker'] = filter_smoker
    
    console.log("guery2222", HomestayIndex.getComponentMethods().search());
    console.log("Session.set('search_query',query)", Session.set('search_query',''));
    HomestayIndex.getComponentMethods().search(query)
    Session.set('search_query',query)
    FlowRouter.go('search')
  }

  render() {
    let _this = this;
    let country_options = CountryList.map(function (country,index){
      return (
          <li key={index} value={country} onClick={_this.selectDropDown.bind(this)}>{country}</li>
      )
    });

    let city_options = CityList.map(function (city,index){
      return (
          <li key={index} value={city} onClick={_this.selectDropDown.bind(this)}>{city}</li>
      )
    });
    return (
      <section className="search-container">
        <div className="fluid-container">
          {/*<div className="search-home-stay">
            <h4>Search for Homestay</h4>
            <p>Enter your information to display your homestay.</p>
          </div>*/}
           
              
                <div className="center-block-wrap">
                  <div className="row">
                    <aside className="col-sm-2 search-item">
                      <h4>Country of Study</h4>
                      <div className="custom-select">
                        <div className="active-list added" onClick={this.customSelect.bind(this)}>Canada</div>
                        <input type="text" ref="filter_country" className="list-field" defaultValue={'Canada'} />
                        <ul className="drop-down-list">
                        <li value="" onClick={this.selectDropDown.bind(this)}>View All</li>
                          {country_options}
                        </ul>
                      </div>
                    </aside>
                    <aside className="col-sm-2 search-item">
                      <h4>City</h4>
                      <div className="custom-select">
                        <div className="active-list" onClick={this.customSelect.bind(this)}>Please select </div>
                        <input type="text" ref="filter_city" className="list-field" defaultValue={'View All'} />
                        <ul className="drop-down-list">
                          <li value="" onClick={this.selectDropDown.bind(this)}>View All</li>
                          {city_options}
                        </ul>
                      </div>
                    </aside>
                    <aside className="col-sm-2 search-item">
                      <h4>Gender</h4>
                      <div className="custom-select">
                        <div className="active-list" onClick={this.customSelect.bind(this)}>Choose</div>
                        <input type="text" ref="filter_gender" className="list-field" defaultValue={'View All'} />
                        <ul className="drop-down-list">
                          <li onClick={this.selectDropDown.bind(this)}>View All</li>
                          <li onClick={this.selectDropDown.bind(this)}>Male</li>
                          <li onClick={this.selectDropDown.bind(this)}>Female</li>
                        </ul>
                      </div>
                    </aside>
                    <aside className="col-sm-2 search-item">
                      <h4>smoker</h4>
                      <div className="custom-select">
                        <div className="active-list" onClick={this.customSelect.bind(this)}>Choose</div>
                        <input type="text" ref="filter_smoker" className="list-field" defaultValue={'View All'} />
                        <ul className="drop-down-list">
                          <li onClick={this.selectDropDown.bind(this)}>View All</li>
                          <li onClick={this.selectDropDown.bind(this)}>Yes</li>
                          <li onClick={this.selectDropDown.bind(this)}>No</li>
                          <li onClick={this.selectDropDown.bind(this)}>Both</li>
                        </ul>
                      </div>
                    </aside>
                    <aside className="col-sm-2 search-item start-end">
                      <h4>Start and end Date</h4>
                      <div className="search-6">
                          <input type="text" className="form-control avail-date" placeholder="start date" id="searchStartDate" ref="searchStartDate" />
                      </div>
                      <div className="search-6">
                        <input type="text" className="form-control avail-date" placeholder="end date" id="searchEndDate" ref="searchEndDate" />
                      </div>
                    </aside>  
                     

                    <aside className="col-sm-2 search-item search-item-btn"> 
                      
                      <a onClick={this.handleSearch.bind(_this)} className="primary-btn lg">Search</a>
                    </aside>
                  </div>
                </div>
                {/*<button class="primary-btn lg">Search</button>*/}
                {/*<div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
                  <label>
                    <input id="newsUpdates" type="checkbox" /> news and updates
                  </label>
                </div>*/}
            
            
          
        </div>
        <Blaze template='Search' />
      </section>
    )
  }
}
