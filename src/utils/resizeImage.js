export function resizeImage(img, width, height) {
  // create an off-screen canvas
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

  // set its dimension to target size
  canvas.width = img.width > width ? width : img.width;
  canvas.height = img.height > height ? height : img.height;

  // draw source image into the off-screen canvas:
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // encode image to data-uri with base64 version of compressed image
  return canvas.toDataURL('image/jpeg');
}
