const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

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

module.exports = {
  UserType,
};
