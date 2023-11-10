const postcss = require('postcss');
const plugin = require('./');

function run(input, output, opts = {}) {
  return postcss([ plugin(opts) ]).process(input, { from: undefined })
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

it('Simple', () => run(
  '.simple { font-size: em-convert(24px, 16px); }',
  '.simple { font-size: 1.5em; }'
));

it('Multiple values', () => run(
  '.multiple { padding: em-convert(5px 10px, 16px); }',
  '.multiple { padding: 0.3125em 0.625em; }'
));

it('Multiple mixed values', () => run(
  '.mixed { border-bottom: em-convert(1px solid black, 16px); }',
  '.mixed { border-bottom: 0.0625em solid black; }'
));

it('Comma-separated values', () => run(
  '.comma { box-shadow: em-convert(0 0 2px #ccc, inset 0 0 5px #eee, 16px); }',
  '.comma { box-shadow: 0 0 0.125em #ccc, inset 0 0 0.3125em #eee; }'
));

it('Alternate use', () => run(
  '.alternate { text-shadow: em-convert(1px 1px, 16px) #eee, em-convert(-1px, 16px) 0 #eee; }',
  '.alternate { text-shadow: 0.0625em 0.0625em #eee, -0.0625em 0 #eee; }'
));

it('In function', () => run(
  '.function { font-size: calc(em-convert(24px, 16px) + 3vw); }',
  '.function { font-size: calc(1.5em + 3vw); }'
));

it('Changing precision', () => run(
  '.precision { font-size: em-convert(1px, 3px); }',
  '.precision { font-size: 0.333em; }',
  {
    precision: 3
  }
));

it('Changing name', () => run(
  '.name { font-size: convert-em(24px, 16px); }',
  '.name { font-size: 1.5em; }',
  {
    name: 'convert-em'
  }
));
