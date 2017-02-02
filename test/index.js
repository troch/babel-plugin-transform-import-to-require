import { transform } from 'babel-core';
import { expect } from 'chai';
import babelPluginTransformImportToRequire from '../src';

const transformCode = (code) => transform(
  code, {
    plugins: [
      babelPluginTransformImportToRequire
    ]
  }).code

describe('babel-plugin-transform-import-to-require', () => {
    it('should replace import() with require() ', () => {
      const initialCode = `const module = import('./module');`;
      const transformedCode = transformCode(initialCode);

      expect(transformedCode).to.equal(`const module = require('./module');`);
    });

    it('should replace import() with require() anywhere', () => {
      const initialCode = `lazyLoadModule(import('./module'));`;
      const transformedCode = transformCode(initialCode);

      expect(transformedCode).to.equal(`lazyLoadModule(require('./module'));`);
    });

    it('should throw if import is not called with a string litteral', () => {
      const initialCode = `
        const path = './module';
        const module = import(path);
      `;

      expect(() => transformCode(initialCode)).to.throw();
    });
});
