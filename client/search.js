/*****************************************************************************/
/* Search: Event Handlers */
/*****************************************************************************/
// import { Homestays } from '../imports/api/homestays/homestays.js';
Template.Search.events({
	// clear search input on blur
    'blur input':function(event,template){
      var route_name = FlowRouter.getRouteName()
      if(route_name != 'search')
        Meteor.setTimeout(function(){$(event.target).val('').keyup();}, 100);         
    },
	// 'click .campaign-result':function(event,template){
	// 	// redirect to campaign view page
	// 	Router.go('campaign-view', {_id:this.__originalId})
	// },
	'keypress input': function (event, template) {
	    if (event.which === 13) {
            var query = $(event.target).val()
	        // Router.go('search',{},{query: 'q='+query})
            if (query.trim())
                FlowRouter.go('search')
	    }
  }

});

/*****************************************************************************/
/* Search: Helpers */
/*****************************************************************************/
Template.Search.helpers({
    HomestayIndex: function () {
        return HomestayIndex;
    },
    // search box attributes
    attributes: function () {
      return { class: 'search-homestay-easy' };
    } 
});
