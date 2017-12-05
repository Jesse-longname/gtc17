// let name = "";
// let bio = "";
// let photo = "";
//
// {
//    "profile": [
//       {
//          "name": name,
//          "bio": bio,
//          "photo": photo
//       }
//    ]
// }

// Resize input fields
jQuery.each(jQuery('textarea[data-autoresize]'), function() {
    var offset = this.offsetHeight - this.clientHeight;

    var resizeTextarea = function(el) {
        jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
    };
    jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
});

function revealMe(){
  $("#fileUp").removeClass("hidden");
}

function saveForm(){
  name = $("#name").val();
  bio = $("#bio").val();
  photo = "";
  $("#fileUp").addClass("hidden");
}
