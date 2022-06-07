/**
 *
 * @param {Object} errors
 * @param {Function} [callback]
 * @returns {{}}
 */
export function getErrors(errors, callback) {
  const newErrors = {};

  try {
    Object.keys(errors).forEach((key) => {
      const [value] = errors[key];
      newErrors[key] = value;
      if (callback) {
        callback(key, value, newErrors);
      }
    });

    return newErrors;
  } catch (err) {
    console.log(err);
    return newErrors;
  }
}
