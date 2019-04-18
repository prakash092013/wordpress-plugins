<?php
/**
 * Create a new table class that will extend the WP_List_Table
 */
class Import_xml
{

    function __construct() {
        add_action( 'wp_ajax_import_xml_data', array( $this,'import_xml_data_cb') );
        add_action( 'wp_ajax_nopriv_import_xml_data', array( $this,'import_xml_data_cb') );
    }

    public function check_xml_data($xml_data){
        if(!$xml_data){
            throw new Exception("XML file can't be parsed. Try to open the file in any browser to check for the errors.");
        }
        return true;
    }

    public function import_xml_data_cb(){
        
        check_ajax_referer( 'auth_xml_file', 'security' );

        if ( $_REQUEST['action'] != 'import_xml_data'  ) {
            return;
        }

        $imageFileType = strtolower(pathinfo($_FILES['xmlInputFile']['name'],PATHINFO_EXTENSION));
        
        if( $imageFileType == "xml" ){
            if (isset($_FILES['xmlInputFile']) && ($_FILES['xmlInputFile']['error'] == UPLOAD_ERR_OK)) {
                $xml_data = simplexml_load_file($_FILES['xmlInputFile']['tmp_name']);
                try {
                    $this->check_xml_data($xml_data);

                    $return_array = $this->insert_into_wp($xml_data, $_REQUEST['post_status']);

                } catch (Exception $e) { 
                    $return_array = array( 'status' => 0, 'msg' => $e->getMessage() );
                }
            } else{ // error check else part
                $return_array = array( 'status' => 0, 'msg' => "Please upload a valid file." );
            }
        } else { //xml check else part
            $return_array = array( 'status' => 0, 'msg' => "Only XML files are allowed." );
        }
        die(json_encode($return_array));
    }

    public function insert_into_wp($xml_data, $post_status){
        
        if( $xml_data && count($xml_data) > 0 ){

            $post_ids = array();
            $error_msg = array();

            foreach ($xml_data as $key => $xmlnode) {
                

                // check category exists or not
                $cat_id = category_exists( (string)$xmlnode->category_name );
                if( $cat_id ){
                    $post_cate = $cat_id;
                } else{
                    $my_cat = array(
                            'cat_name' => (string)$xmlnode->category_name, 
                            'taxonomy' => 'category' 
                    );

                    $wpdocs_cat_id = wp_insert_category( $my_cat );
                    $post_cate = $wpdocs_cat_id;
                }

                if( (string)$xmlnode->title == "" ){
                    $error_msg[] = "Post not created as title is empty. Node number is #".$key;
                } else{

                    // Create post object
                    $my_post = array(
                      'post_title'    => wp_strip_all_tags( (string)$xmlnode->title ),
                      'post_content'  => (string)$xmlnode->description,
                      'post_status'   => $post_status,
                      'post_date'     => (string)$xmlnode->created_date,
                      // 'meta_input'   => array( '_post_image' => (string)$xmlnode->image_name ),
                      'post_category' => array($post_cate),
                    );
                     
                    try {
                        // Insert the post into the database
                        $post_id = wp_insert_post( $my_post );
                        $post_ids[] = $post_id;

                        // add featured image to post
                        $image_url = (string)$xmlnode->image_name;
                        $this->set_post_image( $image_url, $post_id );

                    } catch (Exception $e) { 
                        $error_msg[] = $e->getMessage();
                    }
                }
            }

            $success_msg = count($post_ids).' posts inserted in '.$post_status.' mode. <a href="'.admin_url().'/edit.php?post_status=draft&post_type=post" target="_blank"> View Posts</a>';

            $error_msg = implode("<br>", $error_msg );

            $return_array = array( 'status' => 1, 'msg' => $success_msg, 'errors' => $error_msg );

        } else{
            $return_array = array( 'status' => 0, 'msg' => "XML contains no data to be imported" );
        }
        return $return_array;
    }

    public function set_post_image($image_url, $post_id) {
        // Add Featured Image to Post
        $image_url        = $image_url; // Define the image URL here
        $image_name       = $post_id.'.jpg';
        $upload_dir       = wp_upload_dir(); // Set upload folder
        $image_data       = file_get_contents($image_url); // Get image data
        $unique_file_name = wp_unique_filename( $upload_dir['path'], $image_name ); // Generate unique name
        $filename         = basename( $unique_file_name ); // Create image file name

        // Check folder permission and define file location
        if( wp_mkdir_p( $upload_dir['path'] ) ) {
            $file = $upload_dir['path'] . '/' . $filename;
        } else {
            $file = $upload_dir['basedir'] . '/' . $filename;
        }

        // Create the image  file on the server
        file_put_contents( $file, $image_data );

        // Check image file type
        $wp_filetype = wp_check_filetype( $filename, null );

        // Set attachment data
        $attachment = array(
            'post_mime_type' => $wp_filetype['type'],
            'post_title'     => sanitize_file_name( $filename ),
            'post_content'   => '',
            'post_status'    => 'inherit'
        );

        // Create the attachment
        $attach_id = wp_insert_attachment( $attachment, $file, $post_id );

        // Include image.php
        require_once(ABSPATH . 'wp-admin/includes/image.php');

        // Define attachment metadata
        $attach_data = wp_generate_attachment_metadata( $attach_id, $file );

        // Assign metadata to attachment
        wp_update_attachment_metadata( $attach_id, $attach_data );

        // And finally assign featured image to post
        set_post_thumbnail( $post_id, $attach_id );
    }

    public function display_import_form()
    {


        $html = '<div id="ajax_response"></div>
        <form id="upload_xml_form" action="#" method="post" enctype="multipart/form-data">
            <div class="form-group">
            <label for="post_status">Select mode</label>
            <select name="post_status" id="post_status">
                <option value="draft">Draft (visible to wp admin)</option>
                <option value="publish">Publish (visible to public)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="xmlInputFile">Upload XML</label>
            <input type="file" id="xmlInputFile" name="xmlInputFile">
            <p class="help-block"><i>(Only XML files are allowed)</i></p>
          </div>
          <button type="submit" id="upload_xml_btn" class="btn btn-primary">Submit</button>
        </form>';

        
        return $html;
    }

}
$Import_xml = new Import_xml();
?>