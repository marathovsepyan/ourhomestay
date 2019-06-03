import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress'
import Dialog           from 'material-ui/Dialog';

var Validation = require('react-validation');
var validator = require('validator');

import { Homestays } from './../../api/homestays/homestays.js';
import { Bookings } from './../../api/booking/bookings.js';
import { updateBooking } from './../../api/booking/methods.js';

export default class ConfirmBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error           : '',
      success         : '',
      multipleChoice  : false,
      limit           : '',
      skip            : '',
      selectedHomestay : []
    };
  }

  // set theme to material-ui components
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
  //allow selection of multiple homestays
  activateMultipleChoice(event) {
  	this.setState({"multipleChoice": true})
    Session.set("limit",2)
    $(event.currentTarget).prop('disabled',true)
  }

  // deactivate multiple choice 
  deActivateMultipleChoice(event) {
  	this.setState({"multipleChoice": false})
  	FlowRouter.go('/payment/'+this.props.bookingDetail._id)
  }

  //function to load more homestay suggestions
  loadMoreSearchResult(event){
    Session.set("limit",Session.get("limit")+6)
  }

  //function to select homestay
  selectHomestay(event) {
    let homestayId = $(event.currentTarget).attr('data-id');
    this.setState({"error": ""})
    if($(event.currentTarget).text()==="Select") {
      if(this.state.selectedHomestay.length<2) {
        this.state.selectedHomestay.push(homestayId)
        $(event.currentTarget).parents(".homestay-items").addClass("selected")
        $(event.currentTarget).text("Remove")
      } else {
        this.setState({"error": "Only 2 host can be selected"})
      }
    } else {
      let index = this.state.selectedHomestay.indexOf(homestayId);
      if (index > -1) {
          this.state.selectedHomestay.splice(index, 1);
      }
      $(event.currentTarget).parents(".homestay-items").removeClass("selected")
      $(event.currentTarget).text("Select")
    }
  }

  // function to redirect to payment page and store choices in db
  paymentHandle(event){
    let self = this;
    let bookingDetail = {
      choice2 : (this.state.selectedHomestay.length)? this.state.selectedHomestay[0] : "",
      choice3 : (this.state.selectedHomestay.length ===2) ? this.state.selectedHomestay[1]:"",
      multipleChoice : this.state.multipleChoice
    }
    if(this.state.multipleChoice && this.state.selectedHomestay.length) {
      // Function call to update booking collection
      updateBooking.call({bookingId:this.props.bookingDetail._id, bookingDetail}, (error, response) => {
        if(error){
          self.setState({'error':error.reason});
        } else {
            FlowRouter.go('/payment/'+self.props.bookingDetail._id)
        }
      })
    } else {
        FlowRouter.go('/payment/'+self.props.bookingDetail._id)
    }
  }

  // Function to show error message
  getErrorMessage() {
    if(this.state.error) {
      return (<div className="col-sm-8">
                            <div className="error-message">{this.state.error} </div>
                          </div>)
    }
    if (this.state.success) {
      return (<div className="col-sm-8">
                            <div className="success-message">{this.state.success}</div>
                          </div>)
    }
  }

  starRating(homestay){
    console.log(homestay)
    let stars = []

    let rate = homestay.avg_rating || 0
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

   // show homestay choices based on search query
  renderHomestaySuggestions () {
    Session.set('homestayCity',this.props.homestay.city);
    if(this.state.multipleChoice) {
      let self = this;
      let bookingPrice = "";
      // for (var i = 0; i < this.props.searchResult.length - 1; i++) {
      //       var j = i + Math.floor(Math.random() * (this.props.searchResult.length - i));
      //       var temp = this.props.searchResult[j];
      //       this.props.searchResult[j] = this.props.searchResult[i];
      //       this.props.searchResult[i] = temp;
      // }
      let moreHomestays = this.props.searchResult.map(function (homestay, index) {
        if(homestay._id !== self.props.homestay._id){
          bookingPrice = (self.props.bookingDetail.bookingType ==="dayBooking")?(homestay.dailyPrice*self.props.bookingDetail.lengthOfStay):(homestay.weeklyPrice*self.props.bookingDetail.lengthOfStay)
          let homestayAddress = "";
          if(homestay.hasOwnProperty("address")) {
            homestayAddress = (homestay.address.length <= 75)?homestay.address : homestay.address.substring(0, 72) + "..."
          }
          if (homestay.dailyPrice >0 || homestay.weeklyPrice >0) {
            return (
              <div key={index} className="col-sm-4">
                      <div className="homestay-items">
                        <figure><img src={(homestay.hasOwnProperty("image")&& homestay.image.length)?homestay.image[0].url:"../images/homes/05.jpg"} alt={homestay.name} /></figure>
                        <div className="content-box-homestay">
                          <a href={"/homestay/"+homestay._id+""} target="_blank" className="title-home">{homestay.name}</a>
                          <p>{homestayAddress}</p>
                          <div className="bottom-price">
                            <div className="price-details">CAD {bookingPrice}/-</div>
                            {self.starRating(homestay)}
                          </div>
                          <div className="row grid-sm">
                            <div className="col-sm-5"><button className="btn primary-btn sm" onClick={self.selectHomestay.bind(self)} ref="selectHomestay" data-id={homestay._id}>Select</button></div>
                            <div className="col-sm-5"><a href={"/homestay/"+homestay._id+""} target="_blank" className="btn default-btn sm">More</a></div>
                          </div>
                        </div>
                      </div>
             </div>
            )
          } else {
            return ( <div key={index}></div>)
          }
        } else {
          return <div key={index}></div>
        }
      })
      return (
        <div>
          {moreHomestays}
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
  
  //Show selected homestay 
  renderMultipleHomestays(){
    let searchMoreButton = ""
    if(this.props.homestayCount >Session.get("limit")) {
     searchMoreButton = <div className="pull-right">
                  <button className="btn cancel-btn" onClick={this.loadMoreSearchResult.bind(this)}>Load More</button>
                </div>
    }
  	if(this.state.multipleChoice) {
      let homestayAddress = "";
      if(this.props.homestay.hasOwnProperty("address")) {
         homestayAddress = (this.props.homestay.address.length <= 75)?this.props.homestay.address : this.props.homestay.address.substring(0, 72) + "..."
  		}
      return (
  			<div>
  			<div className="similar-homestays">
              <div className="row">
                {this.getErrorMessage()}
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="homestay-items selected">
                    <figure><img src={(this.props.homestay.hasOwnProperty("image")&& this.props.homestay.image.length)?this.props.homestay.image[0].url:"../images/homes/05.jpg"} alt={this.props.homestay.name} /></figure>
                    <div className="content-box-homestay">
                      <a href={"/homestay/"+this.props.homestay._id+""} target="_blank" className="title-home">{this.props.homestay.name}</a>
                      <p>{homestayAddress}</p>
                      <div className="bottom-price">
                        <div className="price-details">CAD {this.props.bookingDetail.paymentAmount}/-</div>
                        {this.starRating(this.props.homestay)}
                      </div>
                      <div className="row grid-sm">
                        {/*<div className="col-sm-5"><button className="btn primary-btn sm">Selected</button></div>*/}
                        <div className="col-sm-5"><a href={"/homestay/"+this.props.homestay._id+""} target="_blank" className="btn default-btn sm">More</a></div>
                      </div>
                    </div>
                  </div>
                </div>
                {this.renderHomestaySuggestions()}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <button onClick={this.paymentHandle.bind(this)} className="btn primary-btn">Continue</button>
                {searchMoreButton}
              </div>
            </div>
            </div>
  		)
  	} else{
  		return(<div></div>)
  	}
  }
  // render bookind details
  renderBookingDetail(){
  	if(this.props.bookingLoading) {
  		return (
            <div>
                <center>
                    <CircularProgress size={1.5} color="#272b35" />
                </center>
            </div>
        )
  	} else {
  		return (
  		<section className="main-content-wrapper common-layout-box">
        <section className="common-layout-box-wrap">
          <div className="header-wrap">Confirm booking</div>
          <article className="common-layout-content students-form">
            <p>Would you like to choose a backup host incase <b>{this.props.homestay.name}</b> is not available?</p>
            <button className="btn primary-btn" onClick={this.activateMultipleChoice.bind(this)}>Yes</button>
            <button className="btn cancel-btn" onClick={this.deActivateMultipleChoice.bind(this)}>No</button>
            {this.renderMultipleHomestays()}
          </article>
        </section>
      </section>
      )
  	}
  }
  render() {
  	return this.renderBookingDetail()
  }
}

// To set theme for material-ui components
ConfirmBooking.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  let bookingId = FlowRouter.getParam('bookingId');
  console.log("booking id===================>",bookingId)
  const BookingHandle  = Meteor.subscribe('bookingDetail', bookingId);
  if (BookingHandle.ready()) {
    const bookingDetail  = Bookings.find().fetch()[0]
    const HomestayHandle = Meteor.subscribe('homestayDetail', bookingDetail.roomId);
    let searchIndex = { city:Session.get('homestayCity'),status:"active" }
    if(bookingDetail.searchIndex){
      searchIndex     = JSON.parse(bookingDetail.searchIndex);
    }
    
    searchIndex["_id"] = { $ne: bookingDetail.roomId}
    searchIndex["dailyPrice"] = { $gte: 1}
    searchIndex["weeklyPrice"] = { $gte: 1}
    const HomestaySearchHandle = Meteor.subscribe('homestaySearch', searchIndex, Session.get("limit"), 0)
    return {
        currentUser     : Meteor.user(),
        bookingLoading  : !BookingHandle.ready() && !HomestayHandle.ready() && !HomestaySearchHandle.ready(),
        homestay        : Homestays.find({_id:bookingDetail.roomId}).fetch()[0],
        bookingDetail   : Bookings.find({_id:bookingId}).fetch()[0],
        searchResult    : Homestays.find(searchIndex).fetch(),
        homestayCount   : Counts.get('homestaySearch-count')
    }
  } else {
    return {
        currentUser     : Meteor.user(),
        bookingLoading  : !BookingHandle.ready()
    }
  }
}, ConfirmBooking);

// React Component for BookRoom form
export class MultipleHomestay extends Component {
	render() {
    return (
        <div></div>
    )
  }
}