import { PropTypes } from "react";
import { getConstructor, getConstructorName } from "./type";
import _ from "lodash";

/**
 * Return a new validator based on `validator` but with the option to chain
 * `isRequired` onto the validation. This is nearly identical to how React
 * does it internally, but they don't expose their helper for us to use.
 * @param {Function} validator Validation function.
 * @returns {Function} Validator with `isRequired` option.
 */
export const makeChainable = function (validator) {
  /* eslint-disable max-params */
  const _chainable = function (isRequired, props, propName, componentName) {
    const value = props[propName];
    if (typeof value === "undefined" || value === null) {
      if (isRequired) {
        return new Error(
          `Required \`${propName}\` was not specified in \`${componentName}\`.`
        );
      }
      return null;
    }
    return validator(props, propName, componentName);
  };
  const chainable = _.bind(_chainable, null, false);
  chainable.isRequired = _.bind(_chainable, null, true);
  return chainable;
};

/**
 * Check that the value is a non-negative number.
 */
export const nonNegative = makeChainable((props, propName, componentName) => {
  const error = PropTypes.number(props, propName, componentName);
  if (error) {
    return error;
  }
  const value = props[propName];
  if (value < 0) {
    return new Error(
      `\`${propName}\` in \`${componentName}\` must be non-negative.`
    );
  }
});

/**
 * Check that the value is a two-item Array in ascending order.
 */
export const minMaxArray = makeChainable((props, propName, componentName) => {
  const error = PropTypes.array(props, propName, componentName);
  if (error) {
    return error;
  }
  const value = props[propName];
  if (value.length !== 2 || value[1] < value[0]) {
    return new Error(
      `\`${propName}\` in \`${componentName}\` must be a [min, max] array.`
    );
  }
});

/**
 * Check that the value looks like a d3 `scale` function.
 */
export const scale = makeChainable((props, propName, componentName) => {
  const value = props[propName];
  if (typeof value !== "function" || !value.copy || !value.domain || !value.range) {
    return new Error(
      `\`${propName}\` in \`${componentName}\` must be a d3 scale.`
    );
  }
});

/**
 * Check that an array contains items of the same type.
 */
export const homogenousArray = makeChainable((props, propName, componentName) => {
  const error = PropTypes.array(props, propName, componentName);
  if (error) {
    return error;
  }
  const value = props[propName];
  if (value.length > 1) {
    const constructor = getConstructor(value[0]);
    for (let i = 1; i < value.length; i++) {
      const otherConstructor = getConstructor(value[i]);
      if (constructor !== otherConstructor) {
        const constructorName = getConstructorName(value[0]);
        const otherConstructorName = getConstructorName(value[i]);
        return new Error(
          `Expected \`${propName}\` in \`${componentName}\` to be a ` +
          `homogenous array, but found types \`${constructorName}\` and ` +
          `\`${otherConstructorName}\`.`
        );
      }
    }
  }
});