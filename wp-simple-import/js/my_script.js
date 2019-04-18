jQuery(document).ready(function () {

    jQuery("#upload_xml_btn").click(function (event) {

        jQuery("#ajax_response").html("");

        //stop submit the form, we will post it manually.
        event.preventDefault();

        // Get form
        var form = jQuery('#upload_xml_form')[0];

        // Create an FormData object 
        var data = new FormData(form);

        data.append('action', 'import_xml_data');
        data.append('security', my_obj.ajax_nonce);
        data.append('post_status', jQuery('#post_status').val());
        
        // disabled the submit button
        jQuery(this).prop("disabled", true);

        jQuery.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: my_obj.ajaxurl,
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if( res.status == 0 ){
                    jQuery("#ajax_response").html('<p class="bg-danger">'+res.msg+'</p>');
                } else{
                    jQuery("#ajax_response").html('<p class="bg-success">'+res.msg+'</p>');
                    if( res.errors ){
                        jQuery("#ajax_response").append('<p class="bg-danger">'+res.errors+'</p>')
                    }
                }
                jQuery("#upload_xml_btn").prop("disabled", false);
                jQuery("#upload_xml_form").reset();

            },
            error: function (e) {
                

                // jQuery("#ajax_response").html('<p class="bg-danger">'++'</p>');
                console.log("ERROR : ", e);
                jQuery(this).prop("disabled", false);

            }
        });

    });

});

// jQuery(document).on('submit', '#import_custom_xml', function(e) {
    
//     var exampleName = jQuery('#exampleName').val();
//     var file_data = jQuery('#xmlInputFile').prop('files')[0];
//     var form_data = new FormData();
    
//     form_data.append('file', file_data);
//     form_data.append();
//     form_data.append('name', exampleName);
//     console.log(form_data);
//     return false;

//     jQuery.ajax({
//         url: my_obj.ajaxurl,
//         type: 'post',
//         contentType: false,
//         processData: false,
//         data: form_data,
//         success: function(response) {
//             console.log(response)
//         },
//         error: function(response) {
//             console.log('error');
//         }

//     });
// });

