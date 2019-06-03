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

import { Comments } from './../../api/comments/comments.js';
import { Homestays } from './../../api/homestays/homestays.js';
import { Ratings } from './../../api/ratings/ratings.js';
import { createComment,deleteComment } from './../../api/comments/methods.js';
import { createRate,updateRate } from './../../api/ratings/methods.js';
import { createBooking, updateBooking } from './../../api/booking/methods.js';
import { Bookings } from './../../api/booking/bookings.js';


export default class HomestayProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error           : '',
      success         : ''
    };
  }

  componentDidMount() {
    
  }
  // set theme to material-ui components
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  getCommentBox() {
      if(this.props.currentUser && this.props.booking > 0) {
        return (
           <CommentBox homestay={this.props.homestay} comments={this.props.comments} currentUser={this.props.currentUser} commentsCount={this.props.commentsCount}/>
        )
      }
    }
  getRating() {
      if(this.props.booking > 0 && this.props.currentUser && Roles.userIsInRole(this.props.currentUser._id, ['Student','Agency'])) {
        return (
            <Ratting homestay={this.props.homestay} userRate={this.props.userRate} rateLoading = {this.props.rateLoading}/>
        )
      }
  }
  //render base html
  renderHtml () {
    // Loader template
    if (this.props.homestayLoading) {
        return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
    }else {
      return (
      <div>
        <ImageSlider homestay={this.props.homestay}/>
        <section className="main-content-wrapper">
          <div className="container">
            <div className="details-wrapper">
              <AboutRoom homestay={this.props.homestay} />
              <Conditions homestay={this.props.homestay} />
            </div>
              <Requirements homestay={this.props.homestay} />
              <GoogleMap homestay={this.props.homestay} />
            {this.getRating()}
           {this.getCommentBox()}
          </div>
        </section>
        </div>
      )
    }
  }

  render() {
    return this.renderHtml()
  }
};

// To set theme for material-ui components
HomestayProfile.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

// meteor container
// subscribe homestay data & comment details
export default createContainer(() => {
  let homestayId = FlowRouter.getParam('homestayId');
  const bookingHomeStay  = Meteor.subscribe('bookingDetailForRatings', homestayId, Meteor.userId());
  const HomestayHandle = Meteor.subscribe('homestayDetail', homestayId);
  const CommentHandle = Meteor.subscribe('comments', homestayId,Session.get('comment-page'));
  const RateHandle = Meteor.subscribe('user.rating',homestayId);
  console.log(bookingHomeStay,"bookingHomeStay")
  return {
      currentUser     : Meteor.user(),
      homestayLoading : !bookingHomeStay.ready() && !HomestayHandle.ready() && !CommentHandle.ready() && !RateHandle.ready(),
      homestay : Homestays.find({_id:homestayId}).fetch()[0],
      comments : Comments.find({homestay_id:homestayId},{sort:{'created_at':-1}}).fetch(),
      commentsCount : Counts.get('comments-count'),
      rateLoading : !RateHandle.ready(),
      userRate : Ratings.findOne({homestay_id:homestayId,user_id:Meteor.userId()}),
      booking : Bookings.find({}).count()
  }
}, HomestayProfile);

// Render Image Slider
export class ImageSlider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }
  componentDidMount() {
      //slider
       $.getScript('/js/owl.carousel.min.js').done(function() {
          $("#detailSlider").owlCarousel({
                navigation : true,
                navigationText: ["<i class='icon-left-arrow'></i>","<i class='icon-right-arrow'></i>"],
                slideSpeed : 300,
                paginationSpeed : 300,
                singleItem : true,
                pagination: false,
                autoHeight : true
            });
        }).fail(function() {
          // do something here
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

  starRating(){
    let stars = []

    let rate = this.props.homestay.avg_rating || 0
    for(var i = 1;i<=5;i++){
      if(rate >= 1){
        stars.push(<span className="star-full" />)
      }else {
        if(rate > 0)
          stars.push(<span className="star-half" />)
        else
          stars.push(<span className="star-empty" />)
      }
      rate = rate-1
    }
    return (<div className="star-rating">{stars}</div>)
  }
  getYoutubeThumb(url){
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      // return match[2];
      return "http://img.youtube.com/vi/"+match[2]+"/hqdefault.jpg"
    } else {
      //error
    }
  }

  getVideoPopup(){
    let self =this
    if(this.props.homestay.videoUrl) {
      return (<div><span className="overlay" />
        <div id="videoPopup" className="popup-box">
          <span className="close-btn"><i className="icon-close" /></span>
          <iframe allowFullScreen src={self.props.homestay.videoUrl} />
        </div> </div>)
    }
  }

  getSlider(){

   let video = "",
       images = "",
       self = this;
    if(this.props.homestay.videoUrl) {
      let videothumb = this.getYoutubeThumb(this.props.homestay.videoUrl)
      video = <div className="item">
          <section className="main-banner video-banner">
            <div className="media-wrapper">
              <img alt={self.props.homestay.name} src={videothumb} />
            </div>
            <div className="banner-content">
              <div className="container">
                <h1>{self.props.homestay.name}</h1>
                <p>{self.props.homestay.city}, {self.props.homestay.country}</p>
                <button className="video-play-btn"><span className="icon-play" /></button>
                {self.starRating()}
              </div>
            </div>
          </section>
        </div>

    }
    if(this.props.homestay.image) {
      images = this.props.homestay.image.map(function (image, index){
        return (
            <div className="item">
          <section className="main-banner">
            <div className="media-wrapper">
              <img alt={self.props.homestay.name} src={image.url}  />
            </div>
            <div className="banner-content">
              <div className="container">
                <h1>{self.props.homestay.name}</h1>
                <p>{self.props.homestay.city}, {self.props.homestay.country}</p>
                {self.starRating()}
              </div>
            </div>
          </section>
        </div>
        )
      })
    }
    return (<div><div className="owl-carousel" id="detailSlider">{video}{images}</div>{this.getVideoPopup()}</div>)
  }

  renderImageSlider () {
    return (

        <div>
        {this.getSlider()}
        </div>
    );
  }
  render () {
    return this.renderImageSlider()
  }
}
// Render About Room
export class AboutRoom extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error     : "",
      success   : "",
      startDate : ""
    };
  }

  componentDidMount() {
      //datepicker
      let dateAfterTwoWeeks = new Date(+new Date + 18144e5);
      // initialise start date and arrival date timepicker
      /* $('#startDate,#arrivalDate').datetimepicker({
          format : 'YYYY-MM-DD',
          daysOfWeekDisabled: [0,1,2,3,4,6], // enable only fridays
          minDate : dateAfterTwoWeeks // enable only dates 2 weeks after current date
      }).on('changeDate', function (selected) {
          var minDate = new Date(selected.date.valueOf());
          console.log(minDate)
          minDate.setDate(minDate.getDate() + 1);
          $('#endDate').datetimepicker('setStartDate', minDate);
      });*/

      // initialise start date timepicker
      $('#startDate').datetimepicker({
          format : 'YYYY-MM-DD',
          //daysOfWeekDisabled: [0,1,2,3,4,6], // enable only fridays
          minDate : dateAfterTwoWeeks // enable only dates 2 weeks after current date
      }).on('dp.change', function (selected) {
        var minDate = new Date(selected.date.valueOf());
            minDate.setDate(minDate.getDate() + 1);
        if ($('#startDate').val()){
          $('#endDate').data("DateTimePicker").minDate(minDate);
        }
          // var minDate = new Date(selected.date.valueOf());
      });
      // initialise start date and arrival date timepicker
      $('#arrivalDate').datetimepicker({
          format : 'YYYY-MM-DD',
          //daysOfWeekDisabled: [0,1,2,3,4,6], // enable only fridays
          minDate : dateAfterTwoWeeks // enable only dates 2 weeks after current date
      });
      let nextDate = new Date($('#startDate').val());
      nextDate.setDate(nextDate.getDate() + 1);
      // initialise end date timepicker
      $('#endDate').datetimepicker({
          format : 'YYYY-MM-DD',
          minDate : nextDate // enable date after start date only
      });
        if($('#searchStartDate').val()){
          $('#startDate').val($('#searchStartDate').val());
        }
        if($('#searchEndDate').val()){
          $('#endDate').val($('#searchEndDate').val());
        }
        if($('#searchStartDate').val()){
          $('#arrivalDate').val($('#searchStartDate').val());
        }
  }

  radioLabel(event) {
    $('.daily-price-card .custom-radio label').removeClass('active');
    $(event.currentTarget).addClass('active');
  }

  dailyPriceDate(event) {
    if($(event.currentTarget).prop('checked')) {
        $('#weeklyPriceAd .text-field').slideUp(400);
        $('#dailyPriceDate .text-field').slideDown(400);
    }
    this.refs.dailyPriceData.value = $(event.currentTarget).prop('checked');
    this.refs.weeklyPriceData.value = false;
  }

  weeklyPriceDate(event) {
    if($(event.currentTarget).prop('checked')) {
        $('#dailyPriceDate .text-field').slideUp(400);
        $('#weeklyPriceAd .text-field').slideDown(400);
    }
    this.refs.weeklyPriceData.value = $(event.currentTarget).prop('checked');
    this.refs.dailyPriceData.value = false;
  }

  bookRoomHandle (event) {
    event.preventDefault();
    this.setState({'error': ''})
    let bookRoomData = {
      roomId      : this.props.homestay._id,
      roomType    : "homestay",
      dailyPrice  : Number(this.props.homestay.dailyPrice),
      weeklyPrice : Number(this.props.homestay.weeklyPrice),
      ownerId     : Meteor.userId(),
      ownerRole   : Meteor.user().roles[0]
    };

    console.log("dailyPriceData")
    console.log(this.refs.dailyPriceData.value)
    console.log("weeklyPriceData")
    console.log(this.refs.weeklyPriceData.value)
    console.log($('#weeklyPriceAd').find('label').hasClass('active'))
    console.log($('#dailyPriceDate').find('label').hasClass('active'))


    if(this.refs.dailyPriceData.value === "true" && $('#dailyPriceDate').find('label').hasClass('active') ){
      if (!this.refs.startDate.value) {
        this.setState({'error': 'Enter your arrival date'})
      } else if (!this.refs.endDate.value) {
        this.setState({'error': 'Enter your leaving date'})
      } else {
        let checkinDate = new Date(this.refs.startDate.value);
        let checkoutDate = new Date(this.refs.endDate.value);
        let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        let diffDays = Math.round(Math.abs((checkinDate.getTime() - checkoutDate.getTime())/(oneDay)));

        bookRoomData['bookingType'] = "dayBooking";
        bookRoomData['checkinDate'] = checkinDate;
        bookRoomData['checkoutDate']= checkoutDate;
        bookRoomData['lengthOfStay']  = Number(diffDays);
        bookRoomData['paymentAmount'] = Number(diffDays*this.props.homestay.dailyPrice);
      }
    } else if(this.refs.weeklyPriceData.value === "true" && $('#weeklyPriceAd').find('label').hasClass('active')) {
      if (!this.refs.arrivalDate.value) {
        this.setState({'error': 'Enter arrival date'})
      } else if (!this.refs.totalWeeks.value) {
        this.setState({'error': 'Enter number of weeks you intend to stay'})
      } else if(!this.refs.totalWeeks.value.match(/^[0-9\s]+$/)){
        this.setState({'error': 'Enter valid number of weeks'})
      } else if(this.refs.totalWeeks.value <= 0){
        this.setState({'error': 'Enter number of weeks you intend to stay'})
      } else {
        let checkinDate   = new Date(this.refs.arrivalDate.value);
        let totalDays     = this.refs.totalWeeks.value*7;
        let now           = new Date(this.refs.arrivalDate.value);
        let checkoutDate  = new Date(now.setDate(now.getDate()+totalDays));

        bookRoomData['bookingType']   = "weekBooking";
        bookRoomData['checkinDate']   = checkinDate;
        bookRoomData['checkoutDate']  = checkoutDate;
        bookRoomData['lengthOfStay']  = Number(this.refs.totalWeeks.value);
        bookRoomData['paymentAmount'] = Number(this.refs.totalWeeks.value*this.props.homestay.weeklyPrice);
      }
    }
      var self = this;
      console.log("bookRoomData")
      console.log(bookRoomData)
      if(bookRoomData.hasOwnProperty('bookingType')) {
        console.log(3)
        console.log(bookRoomData)
        if(FlowRouter.getQueryParam('sid')){
          updateBooking.call({bookingId:FlowRouter.getQueryParam('sid'), bookingDetail:bookRoomData}, (error, response) => {
            if(error){
              self.setState({'error':error.reason});
            } else {
              console.log(response)
              FlowRouter.go("/bookroom/"+FlowRouter.getQueryParam('sid'));
            }
          })
        } else {
          bookRoomData['searchIndex'] ="";
          bookRoomData['bookingStatus'] =-1;
          createBooking.call(bookRoomData, (error, response) => {
            if(error) {
              console.log(error)
              self.setState({'error':error.reason});
            } else {
              console.log(response)
              FlowRouter.go("/bookroom/"+response);
            }
          })
        }
      } else {
        console.log(4)
      }
  }
  renderBookRoomForm (){
    let bookRoomButton = ""
    if (Meteor.userId()){
        bookRoomButton = <a className="btn primary-btn lg" onClick={this.bookRoomHandle.bind(this)}>Request Booking</a>
    }
    if (this.props.homestay.dailyPrice >0 || this.props.homestay.weeklyPrice >0) {
      if (Meteor.userId() && !Roles.userIsInRole(Meteor.userId(), ['Homestay', 'Admin', 'University residence'])){
        return ( <div>
            <div id="dailyPriceDate" className="daily-price-card">
              <div className="custom-radio">
                <label className="active" onClick={this.radioLabel.bind(this)}>
                  <input type="radio" defaultValue="true" name="dailyPriceData" id="dailyPriceData" ref="dailyPriceData" onClick={this.dailyPriceDate.bind(this)}/> daily Price CAD {this.props.homestay.dailyPrice}</label>
              </div>
              <div className="text-field" style={{display: 'block'}}>
                <input type="text" className="form-control avail-date" placeholder="start date" id="startDate" ref="startDate" />
                <input type="text" className="form-control avail-date" placeholder="end date" id="endDate" ref="endDate" />
              </div>
            </div>
            <div id="weeklyPriceAd" className="daily-price-card">
              <div className="custom-radio">
                <label onClick={this.radioLabel.bind(this)}>
                <input type="radio" ref="weeklyPriceData" defaultValue="true" name="weeklyPriceData"  id="weeklyPriceData" onClick={this.weeklyPriceDate.bind(this)}/> weekly Price CAD {this.props.homestay.weeklyPrice}</label>
              </div>
              <div className="text-field">
                <input type="text" className="form-control avail-date" name= "arrivalDate" id="arrivalDate" ref="arrivalDate" placeholder="arrival date" />
                <input type="text" className="form-control" id="totalWeeks" ref="totalWeeks" name="totalWeeks" placeholder="Number of weeks"/>
              </div>
            </div>
            {bookRoomButton}
          </div>
        )
      } else {
        return ( <div>
            <div id="dailyPriceDate" className="daily-price-card">
              <div className="custom-radio">
                <label className="active" >
                  <input type="radio" defaultValue="true" name="dailyPriceData" id="dailyPriceData" ref="dailyPriceData" onClick={this.dailyPriceDate.bind(this)}/> daily Price CAD {this.props.homestay.dailyPrice}</label>
              </div>
            </div>
            <div id="weeklyPriceAd" className="daily-price-card">
              <div className="custom-radio">
                <label className="active">
                <input type="radio" ref="weeklyPriceData" defaultValue="true" name="weeklyPriceData" id="weeklyPriceData" onClick={this.weeklyPriceDate.bind(this)}/> weekly Price CAD {this.props.homestay.weeklyPrice}</label>
              </div>
            </div>
          </div>
        )
      }
    } else {
      return(<div></div>)
    }
  }
  getErrorMessage() {
    if(this.state.error) {
      return (<div className="col-sm-8">
                            <div className="error-message">{this.state.error} </div>
                          </div>)
    }
  }
  renderAboutRoom () {
    let bookRoomForm = ""
    return (
      <article className="about-content">
        <h2 className="content-head">About homestay</h2>
        <p>{this.props.homestay.aboutHomestay}</p>
        <div className="specifications">
          <span>Rooms/Beds <i>{this.props.homestay.roomsNumber}</i></span>
          <span>People Living <i>{this.props.homestay.peopleLiving}</i></span>
          <span>Smoker  <i>{this.props.homestay.smoker}</i></span>
          <span>Pets <i>{this.props.homestay.pets}</i></span>
        </div>
        <address>
          <span>Contact</span>
          {this.props.homestay.postalCode?'Postal Code : '+this.props.homestay.postalCode:''}
          {/*Phone       : {this.props.homestay.phone} <br />
          Email       : {this.props.homestay.email}*/}
        </address>
        {this.getErrorMessage()}
        {this.renderBookRoomForm()}
      </article>
    );
  }
  render () {
    return this.renderAboutRoom()
  }
}
// Render conditions
export class Conditions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }
  componentDidMount() {
  }

  renderConditions () {
    return (
      <article className="conditions-content">
        <h2 className="content-head">CONDITIONS</h2>
        <ul className="green-list">
          <li>All placement and booking fees are non-refundable.</li>
          <li>Payment must be made immediately to ensure homestay availability.</li>
          <li>In the event of a host cancellation you will have the option to select a new homestay.</li>
          <li>You will have 5 days after your move-in date to decide whether to commit to your homestay or change homestay free of charge.</li>
          <li>Booking in advance is the best way to ensure that you will get your homestay of choice.</li>
          <li>In the event of early departure please inform us and we will work to return any remaining funds in your account.</li>
        </ul>
      </article>
    );
  }
  render () {
    return this.renderConditions()
  }
}
// Render Requirements
export class Requirements extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }
  componentDidMount() {
  }

  getRequirements(){
    if(this.props.homestay.services) {

      let services = this.props.homestay.services.map(function (service, index){
        return (
            <li>{service}</li>
        )
      })
      return (<ul>{services}</ul>)
    } else{
      return (<ul>
              <li>No services</li>
              </ul>)
    }
  }

  renderRequirements () {
    return (
      <article className="requirements-wrapper">
        <aside className="services-block">
          <h2 className="content-head">Services</h2>
          {this.getRequirements()}
        </aside>
        <aside className="tenant-block">
          <h2 className="content-head">tenant requirements</h2>
          <div className="specifications">
            <span>Smoker  <i>{(this.props.homestay.tenant_smoker)?this.props.homestay.tenant_smoker : "All"}</i></span>
            <span>Gender <i>{(this.props.homestay.tenant_gender)?this.props.homestay.tenant_gender : "All"}</i></span>
          </div>
        </aside>
      </article>
    );
  }
  render () {
    return this.renderRequirements()
  }
}





// Render googleMap
export class GoogleMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }

  geocodeAddress(address) {
    var lat = '';
    var lng = '';
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        latAndLng();
      }
    });
    function latAndLng(){
      var uluru = {lat: lat, lng: lng};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }
  }

  componentDidMount() {

  }

  getGoogleMap(){
    if(this.props.homestay.postalCode) {
      let postalCode = this.props.homestay.postalCode;
      this.geocodeAddress(postalCode);
      return (<div id="map"></div>)
    }else{
      this.geocodeAddress("canada");
      return (<div id="map"></div>)
    }
  }

  renderGoogleMap () {
    return (

      <div className="commentbox-wrapper">
        <h3 className="content-head">Homestay Location</h3>
        {this.getGoogleMap()}
      </div>
    );
  }
  render () {
    return this.renderGoogleMap()
  }
}

// Render Ratting
export class Ratting extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }
   // set theme to material-ui components
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
  componentDidMount() {
    let self = this

    setTimeout(function(){
      $('.rateit').rateit();
      // tooltip fot rate it
      $(".rateit").bind('over', function (event,value) { $(this).attr('title', value); });
     /*   // conformation before rating
    $('.rateit').on('beforerated', function (e, value) {
          if (!confirm('Are you sure you want to rate this homestay: ' +  value + ' stars?')) {
              e.preventDefault();
          }
      });*/
    // rated event
    $('.rateit').on('rated', function() {
      self.rateHomestay($('.rateit').rateit('value'))
    })
    // prefill user rate
        if(self.props.userRate)
          $('.rateit').rateit('value',self.props.userRate.rate)
    }, 1000)

  }

  starRating(){
    let stars = []

    let rate = this.props.homestay.avg_rating || 0
    for(var i = 1;i<=5;i++){
      if(rate >= 1){
        stars.push(<span className="star-full" />)
      }else {
        if(rate > 0)
          stars.push(<span className="star-half" />)
        else
          stars.push(<span className="star-empty" />)
      }
      rate = rate-1
    }
    return (<div className="star-rating">{stars}</div>)
  }

  // for homestay rating
  rateHomestay(value){
    var self = this;
    // if user already rated update
    // else create new entry

    if(this.props.userRate){
      let rate = this.props.userRate;
      rate['newRate'] = value

      updateRate.call(rate, (error, response) => {
            if (error) {
                self.setState({'error':error.reason});
            } else {
                self.setState({'success':'Successfully rated homestay'});
            }
        });
    } else {
      let rate = {
          rate     : value,
          homestay_id : self.props.homestay._id,
          user_id     : Meteor.userId()
        }

        createRate.call(rate, (error, response) => {
            if (error) {
                self.setState({'error':error.reason});
            } else {
                self.setState({'success':'Successfully rated homestay'});
            }
        });
    }

  }

  renderRatting () {
    console.log("rateLoading")
    console.log(this.props.rateLoading)
    if (this.props.rateLoading) {
        return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
    }else {
      return (
        <div className="commentbox-wrapper">
          <h3 className="content-head">Rate Homestay</h3>

          <div className="rateit bigstars" data-rateit-resetable="false"></div>
        </div>
      );
    }
  }
  render () {
      return this.renderRatting()
  }
}

// To set theme for material-ui components
Ratting.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
// Render commentBox
export class CommentBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }
  componentDidMount() {
  }
   // handle comment form submit
   // add new comment
   handleSubmit(event) {
    event.preventDefault();
    console.log("comment submit")
    this.setState({'error':''});
    this.setState({'success':''});
    var self = this;
    var message        = $(event.currentTarget).find('#message').val().trim();

    var comment = {
          message     : message,
          homestay_id : self.props.homestay._id,
          user_id     : Meteor.userId(),
          name        : Meteor.user().profile.name
        }
    createComment.call(comment, (error, response) => {
        if (error) {
            self.setState({'error':error.reason});
        } else {
            $('#form-comment')[0].reset();
            self.setState({'success':'Successfully added comment'});
        }
    });

  }

  renderCommentBox () {
    return (
    <div className="commentbox-wrapper">
        <h2 className="content-head">Comments</h2>
        <form className="comment-form" id="form-comment" onSubmit={this.handleSubmit.bind(this)}>
          <textarea placeholder="Write a comment..." className="form-control" defaultValue={""} id="message"/>
          <input type="submit" className="btn primary-btn" defaultValue="submit" />
        </form>
        <CommentsList comments={this.props.comments} homestay={this.props.homestay} currentUser={this.props.currentUser} commentsCount={this.props.commentsCount}/>
      </div>
    );
  }
  render () {
    return this.renderCommentBox()
  }
}
// Render commentsList
export class CommentsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }
  componentDidMount() {
    Session.set('comment-page',1)
  }
  // for delete comment
  removeMessage(comment,event){
    let self = this
    comment['isOwner'] = this.props.homestay.isOwner(this.props.currentUser._id)
    deleteComment.call(comment, (error, response) => {
        if (error) {
            self.setState({'error':error.reason});
        } else {
            self.setState({'success':'Successfully added comment'});
        }
    });
  }
  // for check logged user have permission to delete comments
  canDelete(comment){
    let self = this
    if(Roles.userIsInRole(this.props.currentUser._id, ['Admin']) || this.props.homestay.isOwner(this.props.currentUser._id) || comment.user_id == this.props.currentUser._id){
      return (<button className="btn delete" onClick={self.removeMessage.bind(self,comment)}>Delete</button>)
    }
  }
  // for check more comments
  hasMoreComment(){
    let self = this
    if(this.props.commentsCount > (Session.get('comment-page')*5)){
      return (<button className="btn loadmore-comments" onClick={self.loadMoreComment.bind(self)}>Load More </button>)
    }
  }
  // load next set og comments
  loadMoreComment(){
    Session.set('comment-page',Session.get('comment-page')+1)
  }
  // render comment list
  getCommentsList(){
    let self = this
    if(this.props.comments.length > 0){
      let comments = this.props.comments.map(function (comment, index){
        return (
          <li>
              <div className="comment-header">
                <span className="username">{comment.name}</span>
                <div className="date">{moment(comment.created_at).format('DD MMM YYYY HH:mm')}</div>
              </div>
              <p>{comment.message}</p>
              {self.canDelete(comment)}
            </li>
        )
      })
      return (<ul>{comments}</ul>)
    } else {
      return (<ul>
              <li>No Comments</li>
              </ul>)
    }
  }

  renderCommentsList () {
    return (
        <div className="comments-items-wrapper">
          {this.getCommentsList()}
          {this.hasMoreComment()}
        </div>
    );
  }
  render () {
    return this.renderCommentsList()
  }
}
