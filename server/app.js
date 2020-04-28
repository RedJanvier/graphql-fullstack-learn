import 'colors';
import express from 'express';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import graphqlHttp from 'express-graphql';
import { checkAuth } from './middlewares/is-auth';
import graphqlSchemas from './graphql/Schemas/index';
import graphqlResolvers from './graphql/Resolvers/index';

config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    return res.status(200).json({});
  }

  return next();
});

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
    console.log(`✅ Server started at http://localhost:${PORT}/graphql`.yellow)
  );
});

export default app;
