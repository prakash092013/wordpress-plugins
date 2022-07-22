jQuery(document).ready(function($){
	
	/**
     * BLOCK: core/gallery .is-style-gallery-carousel
	 * turn wp-block-gallery into bootstrap carousel,
     * TODO: need to restructure js to allow for multi carousels on a single page, dj
	 */

    // add classes, id to wrapper
    $('figure.wp-block-gallery.is-style-gallery-carousel').addClass('carousel slide').attr('data-bs-ride', 'carousel').attr('data-bs-slide', 'false').attr('id', 'gallery-carousel').attr('data-interval', '5000').attr('data-pause', 'hover');;
    
    // add indicators and controls
    $('figure.wp-block-gallery.is-style-gallery-carousel').append('<ol class="carousel-indicators w-100"></ol>');
    $('figure.wp-block-gallery.is-style-gallery-carousel').append('<p class="p-carousel-controls"><a class="carousel-control-prev" href="#gallery-carousel" role="button" data-slide="prev" aria-label="Show previous slide" title="Show previous slide"><span class="carousel-control-prev-icon fas fa-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#gallery-carousel" role="button" data-slide="next" aria-label="Show next slide" title="Show next slide"><span class="carousel-control-next-icon fas fa-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></p>');
    
    // show default single slide
    $('figure.wp-block-gallery.is-style-gallery-carousel').find('ul.blocks-gallery-grid').removeClass('blocks-gallery-grid').addClass('carousel-inner');
    $('figure.wp-block-gallery.is-style-gallery-carousel').find('li.blocks-gallery-item').removeClass('blocks-gallery-item').addClass('carousel-item');
    
    // show 3 items in a single slide
    /*
    $('figure.wp-block-gallery.is-style-gallery-carousel').find('ul.blocks-gallery-grid').addClass('carousel-inner');
    $('figure.wp-block-gallery.is-style-gallery-carousel').find('li.blocks-gallery-item').addClass('carousel-item');
    $.fn.chunk = function(size) {
		var arr = [];
		for (var i = 0; i < this.length; i += size) {
		  arr.push(this.slice(i, i + size));
		}
		return this.pushStack(arr, "chunk", size);
	}
    $('figure.wp-block-gallery.is-style-gallery-carousel').find('li.blocks-gallery-item').chunk(3).wrap('<div class="carousel-item"></div>');
    */
    
    // set indicators index 
	$('figure.wp-block-gallery.is-style-gallery-carousel').find( ".carousel-item" ).each(function(index) {
        $('figure.wp-block-gallery.is-style-gallery-carousel').find( '.carousel-indicators' ).append( '<li id="tab-gallery-carousel-'+index+'" data-target="#gallery-carousel" data-slide-to="'+index+'" aria-controls="tabpanel-gallery-carousel-'+index+'"></li>' );
	});
	
	

    // add aoda requirements
    $('figure.wp-block-gallery.is-style-gallery-carousel').attr('role', 'complementary').attr('aria-labelledby', 'gallery-carousel-title').attr('aria-describedby', 'gallery-carousel-desc').prepend('<h2 id="gallery-carousel-title" class="sr-only">Gallery Carousel</h2>').prepend('<p id="gallery-carousel-desc" class="sr-only">A collection of gallery images.</p>');
    $('figure.wp-block-gallery.is-style-gallery-carousel').find('li.carousel-item').attr('role', 'tabpanel');
    $('figure.wp-block-gallery.is-style-gallery-carousel').find( ".carousel-item" ).each(function(index) {
        $(this).attr('id', 'tabpanel-gallery-carousel-'+index).attr('aria-labelledby', 'tab-gallery-carousel-'+index);
    });
    $('ol.carousel-indicators').attr('role', 'tablist');

    // add active classes
	$('figure.wp-block-gallery.is-style-gallery-carousel').find('.carousel-item:first-of-type').addClass('active');
    $('figure.wp-block-gallery.is-style-gallery-carousel').find('.carousel-indicators li:first-of-type').addClass('active');
    
    // auto sizing images
    // TODO: this may be redundant, consider removing, dj.
    carouselNormalization();

    function carouselNormalization() {
        var items = $('#gallery-carousel .carousel-item'), //grab all slides
            heights = [], //create empty array to store height values
            tallest; //create variable to make note of the tallest slide
        
        if (items.length) {
            function normalizeHeights() {
                items.each(function() { //add heights to array
                    heights.push($(this).height()); 
                });
                tallest = Math.max.apply(null, heights); //cache largest value
                items.each(function() {
                    $(this).css('min-height',tallest + 'px');
                    $(this).find('figure').css('min-height',tallest + 'px');
                    $(this).find('img').css('min-height',tallest + 'px');
                });
            };
            normalizeHeights();
        
            $(window).on('resize orientationchange', function () {
                tallest = 0, heights.length = 0; //reset vars
                items.each(function() {
                    $(this).css('min-height','0'); //reset min-height
                    $(this).find('figure').css('min-height','0');
                    $(this).find('img').css('min-height','0');
                }); 
                normalizeHeights(); //run it again 
            });
        }
    }

    // run the carousel cycle
    $('#gallery-carousel').carousel({
        interval: 5000
      });
    $('#gallery-carousel').find('.carousel-control.right').trigger('click');

    /**
     * BLOCK: core/gallery .is-style-gallery-carousel-desktop
	 * turn wp-block-gallery into bootstrap carousel within desktop device image,
     * TODO: need to restructure js to allow for multi carousels on a single page, dj
	 */

    // add classes, id to wrapper
    $('figure.wp-block-gallery.is-style-gallery-carousel-desktop').addClass('carousel slide').attr('data-bs-ride', 'carousel').attr('id', 'gallery-carousel-desktop').attr('data-interval', '5000').attr('data-pause', 'hover');;
    
    // add indicators and controls
    $('figure.wp-block-gallery.is-style-gallery-carousel-desktop').append('<ol class="carousel-indicators w-100"></ol>');
    $('figure.wp-block-gallery.is-style-gallery-carousel-desktop').append('<p class="p-carousel-controls"><a class="carousel-control-prev" href="#gallery-carousel-desktop" role="button" data-slide="prev" aria-label="Show previous slide" title="Show previous slide"><span class="carousel-control-prev-icon fas fa-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#gallery-carousel-desktop" role="button" data-slide="next" aria-label="Show next slide" title="Show next slide"><span class="carousel-control-next-icon fas fa-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></p>');
    
    // show default single slide
    $('figure.wp-block-gallery.is-style-gallery-carousel-desktop').find('ul.blocks-gallery-grid').removeClass('blocks-gallery-grid').addClass('carousel-inner');
    $('figure.wp-block-gallery.is-style-gallery-carousel-desktop').find('li.blocks-gallery-item').removeClass('blocks-gallery-item').addClass('carousel-item');
    
    // set indicators index 
	$('figure.wp-block-gallery.is-style-gallery-carousel-desktop').find( ".carousel-item" ).each(function(index) {
        $('figure.wp-block-gallery.is-style-gallery-carousel-desktop').find( '.carousel-indicators' ).append( '<li id="tab-gallery-carousel-desktop-'+index+'" data-target="#gallery-carousel-desktop" data-slide-to="'+index+'" aria-controls="tabpanel-gallery-carousel-desktop-'+index+'"></li>' );
	});
	
	// add active classes
	$('figure.wp-block-gallery.is-style-gallery-carousel-desktop').find('.carousel-item:first-of-type').addClass('active');
    $('figure.wp-block-gallery.is-style-gallery-carousel-desktop').find('.carousel-indicators li:first-of-type').addClass('active');

    // add aoda requirements
    $('figure.wp-block-gallery.is-style-gallery-carousel-desktop').attr('role', 'complementary').attr('aria-labelledby', 'gallery-carousel-desktop-title').attr('aria-describedby', 'gallery-carousel-desktop-desc').prepend('<h2 id="gallery-carousel-desktop-title" class="sr-only">Gallery Carousel</h2>').prepend('<p id="gallery-carousel-desktop-desc" class="sr-only">A collection of gallery images.</p>');
    $('figure.wp-block-gallery.is-style-gallery-carousel-desktop').find('li.carousel-item').attr('role', 'tabpanel');
    $('figure.wp-block-gallery.is-style-gallery-carousel-desktop').find( ".carousel-item" ).each(function(index) {
        $(this).attr('id', 'tabpanel-gallery-carousel-desktop-'+index).attr('aria-labelledby', 'tab-gallery-carousel-desktop-'+index);
    });
    $('ol.carousel-indicators').attr('role', 'tablist');


    // run the carousel cycle
    $('#gallery-carousel-desktop').carousel({
        interval: 5000
      });
    $('#gallery-carousel-desktop').find('.carousel-control.right').trigger('click');

}); // end doc ready