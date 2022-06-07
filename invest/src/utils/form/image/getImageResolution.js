export const getImageResolution = (image) => {
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.src = window.URL.createObjectURL(image);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      window.URL.revokeObjectURL(img.src);

      resolve({ width, height });
    };

    img.onerror = () => {
      resolve(false);
    };
  });

  return promise;
};
