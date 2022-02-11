const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const { register, login, createPost, updatePost, deletePost } = require('./mutations');
const { users, user, post, posts } = require('./queries');

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Root query type",
    fields: {
        users,
        user,
        post,
        posts
    }
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Root mutation type",
    fields: {
        register,
        login,
        createPost,
        updatePost,
        deletePost
    }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
