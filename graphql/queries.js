const { GraphQLString, GraphQLList, GraphQLID } = require("graphql");
const { User, Post } = require("../models");
const { UserType, PostType } = require("./types");

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

const posts = {
  type: new GraphQLList(PostType),
  description: "Returns a list of posts",
  resolve: () => Post.find() 
};

const post = {
  type: PostType,
  description: "Get post bt id",
  args: {
    id: {type:GraphQLID}
  },
  async resolve(_, args) {
    const { id } = args;
    return await Post.findById(id);
  }, 
};

module.exports = {
  users,
  user,
  post,
  posts
};
