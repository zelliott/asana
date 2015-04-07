var Gallery = require('./gallery'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

describe('Gallery', function () {
  describe('constructor', function () {
    it('should properly create a new gallery', function () {
      var gallery = new Gallery('$el');
      assert.equal(gallery.$container, '$el');
      assert.deepEqual(gallery.layout, []);
    });
  });

  describe('layoutFrames', function () {

    var gallery;

    beforeEach('create a new gallery', function () {
      gallery = new Gallery('$el');
    });

    it('should layout no images', function () {
      gallery.layout = gallery.layoutFrames([], 0, 0, 0);
      assert.deepEqual(gallery.layout, []);
    });

    it('should properly handle zero height', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 800, height: 200 }
      ], 800, 0, 0);
      assert.deepEqual(gallery.layout, [
        [{ width: 0, height: 0 }]]);
    });

    it('should properly handle zero width', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 800, height: 200 }
      ], 800, 0, 0);
      assert.deepEqual(gallery.layout, [
        [{ width: 0, height: 0 }]]);
    });

    it('should layout one full width image with no padding', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 800, height: 200 }
      ], 800, 200, 0);
      assert.deepEqual(gallery.layout, [
        [{ width: 800, height: 200 }]]);
    });

    it('should layout two half width images with no padding', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 400, height: 200 },
        { width: 400, height: 200 }
      ], 800, 200, 0);
      assert.deepEqual(gallery.layout, [
        [{ width: 400, height: 200 },
         { width: 400, height: 200 }]]);
    });

    it('should layout four half width images with no padding', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 400, height: 200 },
        { width: 400, height: 200 },
        { width: 400, height: 200 },
        { width: 400, height: 200 }
      ], 800, 200, 0);
      assert.deepEqual(gallery.layout, [
        [{ width: 400, height: 200 },
         { width: 400, height: 200 }],
        [{ width: 400, height: 200 },
         { width: 400, height: 200 }]]);
    });

    it('should layout four quarter width images with no padding', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 100, height: 200 },
        { width: 100, height: 200 },
        { width: 100, height: 200 },
        { width: 100, height: 200 }
      ], 800, 200, 0);
      assert.deepEqual(gallery.layout, [
        [{ width: 100, height: 200 },
         { width: 100, height: 200 },
         { width: 100, height: 200 },
         { width: 100, height: 200 }]]);
    });

    it('should layout one oversize-width image with no padding', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 1000, height: 200 }
      ], 800, 200, 0);
      assert.deepEqual(gallery.layout, [
        [{ width: 800, height: 200/(1000/800) }]]);
    });

    it('should layout one oversize-height image with no padding', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 800, height: 250 }
      ], 800, 200, 0);
      assert.deepEqual(gallery.layout, [
        [{ width: 800/(250/200), height: 200 }]]);
    });

    it('should layout one oversize image with no padding', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 2000, height: 250 }
      ], 800, 200, 0);
      assert.deepEqual(gallery.layout, [
        [{ width: 800, height: 100 }]]);
    });

    it('should layout four images with more complex dimensions', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 1000, height: 200 },
        { width: 200, height: 200 },
        { width: 600, height: 400 },
        { width: 100, height: 200 }
      ], 1000, 400, 0);
      assert.deepEqual(gallery.layout, [
        [{ width: 1000, height: 200 }],
        [{ width: 400, height: 400 },
         { width: 600, height: 400 }],
        [{ width: 200, height: 400 }]]);
    });

    // Tests with padding

    it('should layout no images with padding', function () {
      gallery.layout = gallery.layoutFrames([], 0, 0, 20);
      assert.deepEqual(gallery.layout, []);
    });

    it('should layout one full width image with padding', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 1000, height: 250 }
      ], 1000, 250, 20);
      assert.deepEqual(gallery.layout, [
        [{ width: 1000, height: 250 }]]);
    });

    it('should layout two half width images with padding', function () {
      gallery.layout = gallery.layoutFrames([
        { width: 500, height: 250 },
        { width: 500, height: 250 }
      ], 1000, 250, 20);
      assert.deepEqual(gallery.layout, [
        [{ width: 490, height: 245 },
         { width: 490, height: 245 }]]);
    });
  });
});
