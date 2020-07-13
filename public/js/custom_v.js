$('#myCarousel-1').flickity({
  // options

  draggable: true,
  wrapAround: true,
  freeScroll: false,
  prevNextButtons: false,
  pageDots: false
});


// external js: flickity.pkgd.js

var $carousel = $('#myCarousel-1').flickity();

// previous
$('.button--next').on( 'click', function() {
  $carousel.flickity('next');
});
// previous wrapped
$('.button--prev').on( 'click', function() {
  $carousel.flickity( 'previous', true );
});
