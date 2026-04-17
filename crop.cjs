const Jimp = require('jimp');

async function cropThumbnail() {
  try {
    const image = await Jimp.read('thumbnail_raw.png');
    // We want 16:9 ratio. For instance, 1280x720.
    // Cover the area: resize to cover, then crop to center.
    image.cover(1280, 720);
    await image.writeAsync('youtube_thumbnail_v2.png');
    console.log('Successfully cropped to 16:9 (1280x720)!');
  } catch (err) {
    console.error('Error cropping image:', err);
  }
}

cropThumbnail();
