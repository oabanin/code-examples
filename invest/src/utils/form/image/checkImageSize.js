export function checkImageSize(image, size = 15) {
  if (image) {
    return image.size / 1024 / 1024 < size;
  }
  return false;
}
