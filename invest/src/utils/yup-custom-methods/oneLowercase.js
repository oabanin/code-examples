import { regexOneLowerCase } from 'src/utils/form/regex';

export default function (errorMessage) {
  return this.test(`oneLowercase-valid`, errorMessage, function (value) {
    const { path, createError } = this;
    if (!value) return true;
    return regexOneLowerCase.test(value) || createError({ path, message: errorMessage });
  });
}
