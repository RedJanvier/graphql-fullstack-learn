import express from 'express';
import graphqlHttp from 'express-graphql';
import graphqlSchemas from './graphql/Schemas/index';
import graphqlResolvers from './graphql/Resolvers/index';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/graphql', graphqlHttp({
    schema: graphqlSchemas,
    rootValue: graphqlResolvers,
    graphiql: true
}));

app.listen(PORT, console.log(`Server started at http://localhost:${PORT}/graphql`));

export default app;
