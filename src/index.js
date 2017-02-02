import syntax from 'babel-plugin-syntax-dynamic-import';
import template from 'babel-template';

const IMPORT_TYPE = 'Import';
const STRING_LITERAL_TYPE = 'StringLiteral';

const buildRequireExpression = template('require(IMPORT_PATH)');

export default () => ({
  inherits: syntax,
  visitor: {
    CallExpression(path) {
      if (path.node.callee.type === IMPORT_TYPE) {
        const importArgument = path.node.arguments[0];

        if (importArgument.type !== STRING_LITERAL_TYPE) {
          throw new Error('import should be used with a string litteral')
        }

        path.replaceWith(buildRequireExpression({
          IMPORT_PATH: importArgument
        }));
      }
    }
  }
});
