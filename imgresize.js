var Clipper = require('image-clipper');
var clipper = Clipper();
clipper.configure({
    canvas: require('canvas')
});

 
clipper.image('image.png', function() {
    this.crop(90, 1 ,500,300)
    .quality(150)
    .toFile('path/result.png', function() {
       console.log('saved!');
   });
});