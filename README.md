# PostCSS EM [![Build Status][ci-img]][ci]

[PostCSS] plugin to convert px in em. Based on [sass-em](https://github.com/pierreburel/sass-em).

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/pierreburel/postcss-em.svg
[ci]:      https://travis-ci.org/pierreburel/postcss-em

## How it works

The plugin provides a `em()` function which takes at least 2 parameters: the value (px, mixed) and the context (px).
There can be multiple comma-separated values (eg. multiple box shadow), but the last parameter must be the context.

## Example

### Input

```scss
.demo {
  font-size: em(24px, 16px); /* Simple */
  padding: em(5px 10px, 24px); /* Multiple values */
  margin: em(10px .5em, 24px); /* Existing em value */
  border-bottom: em(1px solid black, 24px); /* Multiple mixed values */
  box-shadow: em(0 0 2px #ccc, inset 0 0 5px #eee, 24px); /* Comma-separated values */
  text-shadow: em(1px 1px, 24px) #eee, em(-1px, 24px) 0 #eee; /* Alternate use */
}
```

### Output

```css
.demo {
  font-size: 1.5em; /* Simple */
  padding: 0.20833em 0.41666em; /* Multiple values */
  margin: 0.41666em .5em; /* Existing em value */
  border-bottom: 0.04166em solid black; /* Multiple mixed values */
  box-shadow: 0 0 0.08333em #ccc, inset 0 0 0.20833em #eee; /* Comma-separated values */
  text-shadow: 0.04166em 0.04166em #eee, -0.04166em 0 #eee; /* Alternate use */
}
```

## Usage

Install with `npm i postcss-em` and use with [PostCSS]:

```js
postcss([ require('postcss-em') ])
```

Example with custom options:

```js
postcss([ require('postcss-em')({
  precision: 6      // Default to 5
}) ])
```

See [PostCSS] docs for examples for your environment.
