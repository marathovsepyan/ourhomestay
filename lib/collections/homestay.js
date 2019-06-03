import { Homestays } from '../../imports/api/homestays/homestays.js';
HomestayIndex = new EasySearch.Index({
  collection: Homestays,
  name:'homestays',
  fields: ['country','city','tenant_gender','tenant_smoker','tenant_age'],
  engine: new EasySearch.MongoDB({
    selector: function (searchObject, options, aggregation) {
      // let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      console.log("searchObject---11111--->", searchObject['tenant_smoker']);
      console.log("{ $in: [searchObject.tenant_smoker] }---->", { $in: [searchObject.tenant_smoker] });

      if(searchObject['tenant_smoker'])
        searchObject['tenant_smoker'] = { $in: [searchObject.tenant_smoker] }
        console.log("searchObject['tenant_smoker']---22222---->", searchObject['tenant_smoker'])
      if(searchObject['tenant_gender'])
        searchObject['tenant_gender'] = { $in: [searchObject.tenant_gender] }
      searchObject['status'] = 'active'
      let selector = searchObject
      return selector;
    }
  }),
  defaultSearchOptions: {
    limit: 6
  },
  noDocumentsOnEmpty:true
});
