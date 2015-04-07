'use strict';

/* A Gallery object layouts a set of images
 * @param {JQuery Element} the container element of the gallery
 */
var Gallery = function ($el) {
  this.$container = $el;
  this.layout = [];
  this.containerWidth = 0;
  this.maxRowHeight = 0;
  this.spacing = 0;
};

/* Layouts an array of frames subject to the challenge's requirements
 * @param {Array<Object> images} array of frame objects with width and height
 * @param {Number containerWidth} maximum width of the containing element
 * @param {Number maxRowHeight} maximum height of each row
 * @param {Number spacing} specified spacing between each frame
 * @returns No return value
 */
Gallery.prototype.layoutFrames =
  function (images, containerWidth, maxRowHeight, spacing) {

  // Set Gallery properties
  this.containerWidth = containerWidth;
  this.maxRowHeight = maxRowHeight;
  this.spacing = spacing;

  // Layout of images to be returned
  var layout = [];

  // Reverse images at the start to allow O(1) popping from array
  images.reverse();

  // While there are still images to be organized
  while (images.length > 0) {

    /* While:
     * (1) the current row width is less than the container width and
     * (2) we have more images to add
     * Add images to the current row and scale them to the max row height
     */
    var currentRow = [],
        currentRowWidth = 0;
    while (currentRowWidth < containerWidth && images.length > 0) {
      var image = images.pop();
      image.width = Math.floor(image.width / (image.height / maxRowHeight));
      image.height = maxRowHeight;
      currentRowWidth += image.width;
      currentRow.push(image);
    }

    /* Define a scaling factor to scale down images in the current row by if
     * the row width is greater than the max container width
     */
    var scalingFactor = currentRowWidth / (containerWidth -
      (spacing * (currentRow.length - 1)));

    // If our row width is greater than the max container width
    if (scalingFactor > 1) {

      // Scale all current row images by this factor
      for (var i = 0; i < currentRow.length; i++) {
        image = currentRow[i];
        image.width = Math.floor(image.width / scalingFactor);
        image.height = Math.floor(image.height / scalingFactor);
      }
    }

    // We have finished the current row, so push it to our layout
    layout.push(currentRow);
  }

  return layout;
};

/* Appends images to the container based upon the calculated layout structure
 * Also sets CSS properties of gallery elements
 * @param {String src} the source from which to grab images
 */
Gallery.prototype.fillImages = function (src) {

  // Clear existing images and set the container's width
  this.$container.empty();
  this.$container.css({
    'width': this.containerWidth
  });

  // Also set the header's width (it should match the container's)
  $('#header').css({
    'width': this.containerWidth
  });

  // For each row in the layout, append a row element to the container
  for (var i = 0; i < this.layout.length; i++) {
    this.$container.append('<div class="row"></div>');
    var row = this.layout[i];
    var $row = this.$container.find('.row').eq(i);

    // For each element in each row, append an image
    for (var j = 0; j < row.length; j++) {
      var image = row[j];
      $row.append('<img width="' + image.width + '" height="' + image.height +
        '" src="' + src + image.width + '/' + image.height + '"/>');
    }

    /* Set $row height to the height of the last image in the row (any image
     * in the row would do) and set the bottom-spacing
     */
    $row.css({
      'height': image.height,
      'margin-top': this.spacing
    });
  }

  // Set the spacing between images
  this.$container.find('.row img + img').css({
    'margin-left': this.spacing
  });
};


// Export Gallery for unit tests
if (typeof module !== 'undefined' && module.exports != null) {
    module.exports = Gallery;
}
