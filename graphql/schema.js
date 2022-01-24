const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const { register } = require('./mutations');
const { hello } = require('./queries');

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Root query type",
    fields: {
        hello
    }
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Root mutation type",
    fields: {
        register
    }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
