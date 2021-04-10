const defaults = {
  name: 'em',
  precision: 5
};

module.exports = (options = {}) => {
  const { name, precision } = {...defaults, ...options};
  const regexp = new RegExp('(?!\\W+)' + name + '\\(([^\(\)]+)\\s*,\\s*(\\d*\\.?\\d+)px\\)', 'g');

  const rounded = (value, precision) => {
    precision = Math.pow(10, precision);
    return Math.floor(value * precision) / precision;
  };

  const convert = (values, context) => values.replace(/(\d*\.?\d+)px/g, (_, value) => {
    return rounded(parseFloat(value) / parseFloat(context), precision) + 'em';
  });

  return {
    postcssPlugin: 'postcss-em',
    Once (root) {
      root.replaceValues(regexp, { fast: name + '(' }, (_, values, context) => convert(values, context));
    }
  }
};

module.exports.postcss = true;
