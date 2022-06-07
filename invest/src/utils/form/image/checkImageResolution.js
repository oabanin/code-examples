export async function checkImageResolution(image, maxWidth, maxHeight) {
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.src = window.URL.createObjectURL(image);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      window.URL.revokeObjectURL(img.src);

      resolve(!(width < (maxWidth || 800) || height < (maxHeight || 800)));
    };

    img.onerror = () => {
      resolve('Damaged file');
    };
  });

  return promise;
}
