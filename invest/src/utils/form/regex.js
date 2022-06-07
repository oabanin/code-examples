// export const regexEmail =
//   /^[a-zA-Z0-9]+[a-zA-Z0-9!#$%&.'*\/=?^_`{|}~+-]*@(?:[a-zA-Z0-9]+[a-zA-Z0-9_-]*\.){1,4}[a-zA-Z]{2,63}$/;

export const regexEmail = /^[A-z0-9\+\-\._]+\@[A-z0-9\-\._]+\.[A-z0-9\-\._]{2,}/;

export const regexOneDigit = /\d/;

export const regexOneLowerCase = /\p{Ll}/u;

export const regexOneUpperCase = /\p{Lu}/u;

export const regexAlias = /^[a-z0-9-]+$/;

export const regexAliasReplace = /[^a-z0-9-]/g;
