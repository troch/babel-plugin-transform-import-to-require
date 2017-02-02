# babel-plugin-transform-import-to-require

Babel plugin to transform import() expressions to require() - useful for testing or server-side rendering.

This package is very similar to [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node), expect it doesn't wrap `require` with a promise.

**In**


```js
const importedModule = import('./module');
```

**Out**


```js
const importedModule = require('./module');
```

## Why?

I use a higher-order component in React to lazy load components for code-splitting purposes (see webpack v2), but I also want it to work synchronously for pre-rendering or testing.

See [https://webpack.js.org/guides/lazy-load-react/](https://webpack.js.org/guides/lazy-load-react/)


## Caveat

Your code consuming `import()` needs to account for it to be a promise or the module itself.

