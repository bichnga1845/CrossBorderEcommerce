const { Jimp } = require('jimp');

Jimp.read('public/images/logo.png').then(image => {
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // If pixel is very close to white, make it transparent
    if (r > 240 && g > 240 && b > 240) {
      this.bitmap.data[idx + 3] = 0; // Set alpha to 0
    }
  });
  
  image.write('public/images/logo-transparent.png', () => {
    console.log('Logo processed successfully!');
  });
}).catch(err => {
  console.error('Error processing logo:', err);
});
