import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import {FlowRouter} from 'meteor/kadira:flow-router';

import CircularProgress from 'material-ui/CircularProgress';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Homestays } from './../../api/homestays/homestays.js';

// Homepage component - represents the whole app
export default class Homepage extends Component {
    componentDidMount() {
      if(Roles.subscription.ready()) {
        console.log(1)
        if (Roles.userIsInRole(Meteor.userId(), 'Admin')) {
            console.log('admin')
            FlowRouter.go('/')
        } else if(Roles.userIsInRole(Meteor.userId(), 'Homestay')) {
          if(Meteor.user().profile.homestayId)
            FlowRouter.go('/homestay/'+Meteor.user().profile.homestayId)
          else 
            FlowRouter.go('/homestay/')
        } else if (Roles.userIsInRole(Meteor.userId(), 'University residence')) {
            FlowRouter.go('/universityResidence')
        } else if (Roles.userIsInRole(Meteor.userId(), 'Accounting')) {
            FlowRouter.go('/account/orders')
        } 
      }
      Session.set('homestayCount', 1)
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    renderHomestays(){
      if (this.props.homestayLoading) {
        return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
      } else {
        if (this.props.homestayCount === 0) {
            <p>No Homestays found</p>
        } else {
          for (var i = 0; i < this.props.homestays.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (this.props.homestays.length - i));
            var temp = this.props.homestays[j];
            this.props.homestays[j] = this.props.homestays[i];
            this.props.homestays[i] = temp;
          }
          var homestayNodes = this.props.homestays.map(function (homestay, index) {
              let homestayUrl = "/homestay/"+homestay._id;
              return(
                  <aside className="col-sm-4" key={homestay._id}>
                    <div className="list-block">
                      <a href={homestayUrl}><figure><img src={(homestay.hasOwnProperty("image") && homestay.image.length)?homestay.image[0].url:"../images/homes/05.jpg"} alt={homestay.name} /></figure></a>
                      <div className="list-block-content">
                        <a href={homestayUrl}><span className="home-name">{homestay.name}</span></a>
                        <a href={homestayUrl}><span className="home-location">{homestay.city}, {homestay.country}</span></a>
                      </div>
                    </div>
                  </aside>
              )
          });
          let loadMore = "";
          if((Session.get('homestayCount')*6) < this.props.homestayCount) {
            loadMore = <div className="text-center">
                          <button className="btn secondary-btn about-rooms-btn" onClick={this.loadMoreHomestays.bind(this)}>Load More</button>
                        </div>
          }
          return ( <div>
                    <div className="row" >
                      {homestayNodes}
                    </div>
                    {/*{loadMore}*/}
                  </div>
                  )
        }
      }
    }
    //function to load more homestays
    loadMoreHomestays(event) {
      let pageCount = Session.get('homestayCount')
      if(pageCount) {
        pageCount = pageCount+1;
        Session.set('homestayCount', pageCount)
      } 
    }
    getHomePage () {
    
      return (
          <div>
              <section className="main-banner">
                <div className="media-wrapper">
                  <img src="../images/banner.jpg" />
                </div>
                <div className="banner-content">
                  <div className="container">
                    <h1>Finding your home away from home.</h1>
                    <p>ourHomestay is designed to connect students and homestay all over the world.</p>
                    <a href="/moredetails" target="_blank" className="btn default-btn">more details!</a>
                  </div>
                </div>
              </section>
              {/*Banner Closed*/}
              <section className="main-content-wrapper">
                <div className="container">
                  <article className="homestay-lists">
                    <h2 className="main-head-txt">Available Home Stays</h2>
                    {this.renderHomestays()}
                  </article>
                </div>
              </section>
            </div>
      )
    }
    render() {
        return this.getHomePage()
    }
}
Homepage.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
export default createContainer(() => {
    const HomestayHandle = Meteor.subscribe('homestayList', Session.get('homestayCount'), 0);
    return {
        currentUser     : Meteor.user(),
        homestayLoading : !HomestayHandle.ready(),
        homestays       : Homestays.find({}).fetch(),
        homestayCount   : Counts.get('homestayList-count')
    }
}, Homepage);