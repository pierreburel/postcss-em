const postcss = require('postcss');

const pluginName = 'postcss-em';
const functionName = 'em';
const defaults = {
  precision: 5
};

module.exports = postcss.plugin(pluginName, (opts = {}) => (root) => {
  const options = Object.assign({}, defaults, opts);
  const regexp = new RegExp('(?!\\W+)' + functionName + '\\(([^\(\)]+)\\s*,\\s*(\\d*\\.?\\d+)px\\)', 'g');

  const rounded = (value, precision) => {
    precision = Math.pow(10, precision);
    return Math.floor(value * precision) / precision;
  };

  const convert = (values, context) => values.replace(/(\d*\.?\d+)px/g, (_, value) => {
    return rounded(parseFloat(value) / parseFloat(context), options.precision) + 'em';
  });

  root.replaceValues(regexp, { fast: functionName + '(' }, (_, values, context) => convert(values, context));
});
