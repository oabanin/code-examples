export function checkImageFormat(image) {
  const extension = image.name.split('.').pop();
  return !(
    extension.toLowerCase() !== 'jpeg' &&
    extension.toLowerCase() !== 'jpg' &&
    extension.toLowerCase() !== 'png'
  );
}
