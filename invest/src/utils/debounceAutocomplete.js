/**
 *
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} [immediate]
 * @returns {(function(): void)|*}
 */
export function debounceAutocomplete(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
