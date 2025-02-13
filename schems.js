const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    welcome: {
      type: GraphQLString,
      resolve() {
        return 'Welcome to ETHOS API!';
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
