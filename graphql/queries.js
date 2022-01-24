const { GraphQLString, GraphQLList, GraphQLID } = require("graphql");
const { User } = require("../models");
const { UserType } = require("./types");

const users = {
  type: new GraphQLList(UserType),
  description: "Returns a list of users",
  resolve() {
    return User.find().select('+password');

  },
};

const user = {
  type: UserType,
  description: "Get user by id",
  args: {
    id: {type:GraphQLID}
  },
  resolve(_, args) {
    const { id } = args;
    return User.findById(id);
  },
};

module.exports = {
  users,
  user
};
