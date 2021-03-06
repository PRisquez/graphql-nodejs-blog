const express = require('express');
const schema = require('./graphql/schema');
const { graphqlHTTP } = require('express-graphql');
const { connectDB } = require('./db');
const { authenticate } = require('./middlewares/auth');

connectDB()
const app = express();

app.use(authenticate);

app.get('/',(req, res) => {
    res.send('Welcome to my graphql API');
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000);

console.log('Server running on port 3000');