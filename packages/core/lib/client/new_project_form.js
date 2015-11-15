var form_is_valid = function( email, title, affiliates, funding, description ){

      return true;

    }
,   message_elem
,   show_message = function( text ){
      if ( message_elem ){
        message_elem.innerHTML = text;

      }

    }
;


Meteor.startup( function(){

  if ( Blaze.isTemplate( Template['new_project_form'] ) ){


    Template.new_project_form.rendered = function(){
      message_elem = this.find(".new-project-form .message");


    };


    Template.new_project_form.events({
    	'submit form':function(e){
      	window.__ad__ = window.__ad__ || {};
      	var Ad = window.__ad__
        ,   contactForm = $(e.currentTarget)
        ,   email       = contactForm.find('#new_project_email').val()
        ,   title       = contactForm.find('#new_project_title').val()
        ,   affiliates  = contactForm.find('#new_project_affiliates').val()
        ,   funding     = contactForm.find('#new_project_funding').val()
        ,   description = contactForm.find('#new_project_description').val()
        ;



        if ( form_is_valid( email, title, affiliates, funding, description ) ){

      		var email_text = "Message from: " + email + "\rProject Title:" + title + "\rAffiliates:" + affiliates + "\rFunding status:" + funding + "\rDescription:" + description;

          // Send the email
      		Meteor.call('sendEmail', email_text);

          // Set the response message
          show_message( "Thanks for connecting!<br>We will contact you soon following up about your project.");

          // Show the message pane
          $(".project-form-group .message").fadeIn();

          // Hide the project inputs and textareas
          $(".your-project-title").fadeOut();
          $(".project-form-group").fadeOut();
          Ad.Util.scroll_to_elem( ".new-project" );

        }else {
          // Set the response message
          show_message( "There was an error processing your project form.<br>If the issue persists, please contact us at <a href='mailto:contact@archimedes.digital'>contact@archimedes.digital</a>." );

          // Show the message pane
          $(".project-form-group .message").fadeIn();


        }


    	}
    });

  }

});
