import { config } from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import graphqlHttp from 'express-graphql';
import { checkAuth } from './middlewares/is-auth';
import graphqlSchemas from './graphql/Schemas/index';
import graphqlResolvers from './graphql/Resolvers/index';

config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(checkAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchemas,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(
    PORT,
    console.log(`Server started at http://localhost:${PORT}/graphql`)
  );
});

export default app;
