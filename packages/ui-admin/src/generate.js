var path = require('path');
const { generator } = require('oda-gen-graphql');
const schema = require('api-graphql/dist/schema').default;

generator({
  pack: schema,
  rootDir: path.join(__dirname, 'UI'),
  config: {
    ui: true,
    ts: false,
    graphql: false,
    schema: false,
    packages: ['system'],
  },
});
