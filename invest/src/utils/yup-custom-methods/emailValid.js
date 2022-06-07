import { regexEmail } from 'src/utils/form/regex';

export default function (errorMessage) {
  return this.test(`email-valid`, errorMessage, function (value) {
    const { path, createError } = this;
    if (!value) return true;
    return regexEmail.test(value) || createError({ path, message: errorMessage });
  });
}
