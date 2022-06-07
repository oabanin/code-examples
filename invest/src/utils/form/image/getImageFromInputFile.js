export const getImageFromInputFile = (file) => {
  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise(async (resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          resolve({ src: e.target.result, width: image.width, height: image.height, file: file });
        };
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
};
