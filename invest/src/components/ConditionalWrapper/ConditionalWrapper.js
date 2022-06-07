const ConditionalWrapper = ({ condition, wrapperFunc, children }) =>
  condition ? wrapperFunc(children) : children;

export default ConditionalWrapper;
