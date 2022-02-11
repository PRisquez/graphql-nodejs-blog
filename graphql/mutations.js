const { GraphQLString, GraphQLID } = require('graphql');
const { User, Post } = require('../models');
const { UserType, PostType } = require("./types");
const { createJWTToken } = require('../util/auth')

const register = {
    type: GraphQLString,
    description: "Register a new user and return a token",
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString},
    },
    async resolve(_, args) {
        const { username, email, password, displayName } = args;
        const user = new User({username, email, password, displayName});
        await user.save();
        const token = createJWTToken(user);
        return token;
    },
};

const login = {
    type: GraphQLString,
    description: "Login as user and return a token",
    args: {
        email: { type: GraphQLString },
        password: { type:GraphQLString },
    },
    async resolve(_, args){
        const { email, password } = args;

        const user = await User.findOne({email}).select('+password');

        if (!user || user.password !== password) throw new Error("Invalid credentials");

        const token = createJWTToken(user);

        return token;
    }
}

const createPost = {
    type: PostType,
    description: "Create a new post",
    args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString }
    },
    async resolve(_, args, { user }) {
        const { title, body } = args;
        const newPost = new Post({
            title,
            body,
            authorId: user._id
        });

        await newPost.save()
        return newPost;
    }
};

const updatePost = {
    type: PostType,
    description: 'Update a post',
    args: {
        id: { type: GraphQLID },
        title: { type:GraphQLString },
        body: { type:GraphQLString },
    },
    async resolve(_,{ id, title, body}, { user }){
        if(!user) throw new Error("Unauthorized");

        await Post.findOneAndUpdate({_id: id, authorId: user._id},{title, body},{new: true, runValidators: true});
    }
};

const deletePost = {
    type: GraphQLString,
    description: "Delete a post",
    args: {
        id: { type: GraphQLString },
    },
    async resolve(_,{id},{user}){
        if(!user) throw new Error("Unauthorized");

        const postDeleted = await Post.findOneAndDelete({_id: id, authorId: user._id});

        if (!postDeleted) throw new Error("Post not found");

        return "Post deleted";
    }
}

module.exports = {
    register,
    login,
    createPost,
    updatePost,
    deletePost
}