const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const { register, login } = require('./mutations');
const { users, user } = require('./queries');

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Root query type",
    fields: {
        users,
        user
    }
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Root mutation type",
    fields: {
        register,
        login
    }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
