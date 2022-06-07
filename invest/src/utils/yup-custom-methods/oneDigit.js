import { regexOneDigit } from 'src/utils/form/regex';

export default function (errorMessage) {
  return this.test(`oneDigit-valid`, errorMessage, function (value) {
    const { path, createError } = this;
    if (!value) return true;
    return regexOneDigit.test(value) || createError({ path, message: errorMessage });
  });
}
