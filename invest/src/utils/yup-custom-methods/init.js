import emailValid from 'src/utils/yup-custom-methods/emailValid';
import oneDigit from 'src/utils/yup-custom-methods/oneDigit';
import oneLowercase from 'src/utils/yup-custom-methods/oneLowercase';
import oneUppercase from 'src/utils/yup-custom-methods/oneUppercase';

import * as Yup from 'yup';

const initYupMethods = () => {
  Yup.addMethod(Yup.mixed, 'emailValid', emailValid);
  Yup.addMethod(Yup.mixed, 'oneDigit', oneDigit);
  Yup.addMethod(Yup.mixed, 'oneLowercase', oneLowercase);
  Yup.addMethod(Yup.mixed, 'oneUppercase', oneUppercase);
};

export { initYupMethods };
