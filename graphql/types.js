const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const { User } = require("../models");

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "User type",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  },
});

const PostType = new GraphQLObjectType({
  name: "PostType",
  description: "Post type",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: { type: UserType , async resolve(parent) {
      return await User.findById(parent.authorId)
    }},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  },
});

module.exports = {
  UserType,
  PostType
};
