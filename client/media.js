
import { Homestays } from '../imports/api/homestays/homestays.js';
import { updateHomestay } from '../imports/api/admin/homestays/methods.js';
import { deleteImage } from '../imports/api/admin/homestays/methods.js';



Template.media.events({
    'submit #form-media-test': function(event, template) {
    event.preventDefault();
        Session.set('error',false)
        Session.set('success',false)
        var videoUrl = template.find('input[name="video"]').value,
        	data = Homestays.findOne(),
        	options = {},
            images = Session.get('imageArray');

            if (!videoUrl || videoUrl.match( /^.*(youtube.com\/embed\/)([^#\&\?]*).*/)) {
                options['videoUrl'] = videoUrl
                if(images){
    	            options['image'] = images
    	            editMedia(data._id,options)
        	    } else {
        	    	editMedia(data._id,options)
        	    }

        	    function editMedia(homeStayId,options){

                    let updateHomestay_args = {
                      homestayId : homeStayId,
                      options : options
                    }
                    updateHomestay.call(updateHomestay_args, (error, res) => {
                      if(error){
                        Session.set("error", "Sorry!. Something went wrong please try again.")
                      }else{
                        Session.set("success", "successfully updated")
                      }
                    })

        	    }
            }
    },
    'click .deleteImage' : function(event, template) {
        event.preventDefault();
        let imageId = $(event.currentTarget).attr('data-id');
        let homestayId = Homestays.findOne()._id;
        let deleteImage_args = {
            homestayId,
            imageId
        }
        deleteImage.call(deleteImage_args, (error, res) => {
            if(error){
                Session.set("error", error.reason)
            }else{
                Session.set("success", "Image removed")
            }
        })
    }
});


Template.media.helpers({
    homeData: function () {
    	return Homestays.findOne()
    },
    'submitData': function() {
    	var data = Homestays.findOne()
    	if(data)
        	return JSON.stringify({_id:data._id});
    },
    success: function () {
        success = null
        if (Session.get("success"))
            success = {'type':0,'message':Session.get("success")}
      return success
    },
    error: function () {
        error = null
        if (Session.get("error"))
            error = {'type':1,'message':Session.get("error")}
      return error
    }
});

Template.media.onCreated(function () {
    // init Uploader for image upload
    // Uploader.init(this);
});

Template.media.onRendered(function () {

    // Uploader for image upload
    // Uploader.render.call(this);
    // image preview on file change
    $(document).on('change', 'input[name="picture"]', function(e) {
        e.preventDefault();
        var file = this.files[0]
        var ext = $(this).val()

        $('input[name="picture-selected"]').val(ext)
        $('input[name="picture-changed"]').val(1)

        var param = "png|jpe?g|gif";
        if(ext.match( new RegExp( "\\.(" + param + ")$", "i" ) )){
            var reader = new FileReader();
            reader.onload = function(e) {
              // Update an image on the page with the data
              $('img#projectImagePrew').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
        } else {
            $('img#projectImagePrew').removeAttr('src')
        }

    });

    $.validator.addMethod( "extension", function( value, element, param ) {
        value = $('input[name="picture-selected"]').val()
        param = typeof param === "string" ? param.replace( /,/g, "|" ) : "png|jpe?g|gif";
        return value.match( new RegExp( "\\.(" + param + ")$", "i" ) );
    }, $.validator.format( "Please upload valid image file" ) );
    // validate form media  information
    $('#form-media-test').validate({
        errorClass: 'error-message',
        rules:{
            video: {
                pattern : /^.*(youtube.com\/embed\/)([^#\&\?]*).*/
            },
            picture:{
                extension: "png|jpe?g|gif"
            },
        },
        messages: {
            video: {
                pattern : "Enter a valid video url"
            },
            picture:{
                extension: "Upload a valid image file"
            }
        }
    })

});

Template.media.onDestroyed(function () {
    Session.set('error',false)
    Session.set('success',false)
});


/*Template.customUpload.onCreated(function() {
  Uploader.init(this);
});

Template.customUpload.onRendered (function () {
  Uploader.render.call(this);
});

Template.customUpload.events({
  'click .start': function (e) {
    Uploader.startUpload.call(Template.instance(), e);
  }
});

Template.customUpload.helpers({
  'infoLabel': function() {
    var instance = Template.instance();

    // we may have not yet selected a file
    var info = instance.info.get()
    if (!info) {
      return;
    }

    var progress = instance.globalInfo.get();

    // we display different result when running or not
    return progress.running ?
      info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' :
      info.name + ' - ' + info.size + 'B';
  },
  'progress': function() {
    return Template.instance().globalInfo.get().progress + '%';
  }
})*/
Template.customUpload.helpers({
    homeData: function () {
        return Homestays.findOne()
    },
    myCallbacks: function() {
        return {
            formData: function() {
                var data = Homestays.findOne()
                if(data) {
                    return {
                        _id : data._id
                    }
                }
            },
            finished: function(index, fileInfo, context) {
                var image =[]
                // if (Session.get('imageArray')) {
                //     image = Session.get('imageArray')
                // }
                image.push({url:fileInfo.baseUrl+fileInfo.name,_id:new Meteor.Collection.ObjectID()._str})
                // Session.set('imageArray',image)
                let data        = Homestays.findOne()
                let homestayId  = data._id
                let updateHomestay_args = {
                  homestayId : homestayId,
                  options : {images : image}
                }
                updateHomestay.call(updateHomestay_args, (error, res) => {
                  if(error){
                    Session.set("error", "Sorry!. Something went wrong please try again.")
                  }else{
                    Session.set("success", "successfully updated")
                  }
                })
            }
        }
    }
});
