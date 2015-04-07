$(document).ready(function () {
  'use strict';

  // Define image set
  var $images = [
    { width: 1000, height: 360 },
    { width: 400, height: 600 },
    { width: 600, height: 400 },
    { width: 600, height: 400 },
    { width: 300, height: 400 },
    { width: 300, height: 400 }
  ];

  // Define initial gallery parameters
  var containerWidth = 800;
  var maxRowHeight = 360;
  var spacing = 10;

  // Create gallery
  var gallery = new Gallery($('#gallery'));

  // Layout gallery frames
  gallery.layout =
    gallery.layoutFrames($images, containerWidth, maxRowHeight, spacing);

  // Fill gallery with images
  gallery.fillImages('http://placebear.com/g/');

  // Quick, hacky way to handle tab menu :)
  $('.tab').click(function () {

    // Display which tab is on
    $('.tab').removeClass('tab-on');
    $(this).addClass('tab-on');

    // Fill the gallery with the specified image set
    if ($(this).data('tab') === 'Bears') {
      gallery.fillImages('http://placebear.com/g/');
    } else if ($(this).data('tab') === 'Bills') {
      gallery.fillImages('http://fillmurray.com/g/');
    } else if ($(this).data('tab') === 'Cages') {
      gallery.fillImages('http://placecage.com/g/');
    } else {
      alert('Stop trying to use inspect element!');
    }
  });
});
