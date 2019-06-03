/*****************************************************************************/
/* SearchResult: Event Handlers */
/*****************************************************************************/
// import { HomestayIndex } from '../imports/api/admin/homestays/homestays.js';
import { createBooking } from '../imports/api/booking/methods.js';

Template.SearchResult.events({
	'click #search-load-more':function(event,template){
		HomestayIndex.getComponentMethods().loadMore(6)
	},
	'click .list-block':function(event,template){
		event.preventDefault()
		if(Meteor.userId()) {
			let searchIndex = Session.get('search_query');
			if(searchIndex['tenant_smoker'])
				searchIndex['tenant_smoker'] = { $in: [searchIndex.tenant_smoker,null] }
			if(searchIndex['tenant_gender'])
				searchIndex['tenant_gender'] = { $in: [searchIndex.tenant_gender,null] }
			searchIndex['status'] = 'active'
			if(searchIndex['tenant_age'])
				searchIndex['tenant_age'] = { $lte: parseInt(searchIndex['tenant_age']) }
			console.log("searchIndex")


	      var bookRoomData = {
		      roomId        : this.__originalId,
		      ownerId       : Meteor.userId(),
		      bookingStatus : -1,
		      searchIndex   : JSON.stringify(searchIndex),
		      ownerRole     : Meteor.user().roles[0]
		    };
		    if(Roles.userIsInRole(Meteor.userId(), ['Student']))
		    	bookRoomData['studentId'] = Meteor.userId()
		    console.log("bookRoomData")
		    console.log(bookRoomData)
		    createBooking.call(bookRoomData, (error, response) => {
	          if(error) {
	            console.log(error)
	          } else {
	          	FlowRouter.go('/homestay/'+this.__originalId+'?sid='+response)
	          }
	        })
	    } else {
			FlowRouter.go('/homestay/'+this.__originalId)
		}
	}
});

/*****************************************************************************/
/* SearchResult: Helpers */
/*****************************************************************************/
Template.SearchResult.helpers({
    HomestayIndex: function () {
        return HomestayIndex;
    },
    searchCount: () => {
	  // index instanceof EasySearch.index
	  let dict = HomestayIndex.getComponentDict(/* optional name */);

	  // get the total count of search results, useful when displaying additional information
	  return dict.get('count');
	},
	moreResult: () => {
	  return HomestayIndex.getComponentMethods().hasMoreDocuments()
	}
});

/*****************************************************************************/
/* SearchResult: Lifecycle Hooks */
/*****************************************************************************/
Template.SearchResult.onCreated(function () {
});

Template.SearchResult.onRendered(function () {
});

Template.SearchResult.onDestroyed(function () {
});
