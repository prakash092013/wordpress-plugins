<?php
   /*
   Plugin Name: WP Simple Import
   Plugin URI: http://indianic.com
   description: A plugin to insert the news from XML File
   Version: 1.0
   Author: Indianic
   Author URI: http://indianic.com
   License: GPL2
   */
   
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// include the required files
require dirname(__FILE__).'/fetch_news_menu.php';
require dirname(__FILE__).'/import_list.php';
require dirname(__FILE__).'/Class_Import.php';

?>