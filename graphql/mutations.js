const { GraphQLString } = require('graphql');
const { User } = require('../models');
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

module.exports = {
    register,
    login
}