function unir(){
	watermark(["cat.jpg", 'img/frame.png'])
	  .image(watermark.image.lowerRight(1.0))
	  .load(['img/frame.jpg'])
	  .image(watermark.image.upperRight(1.0))
	  .then(function (img) {
	    document.getElementById('preview').appendChild(img);
	  });
}