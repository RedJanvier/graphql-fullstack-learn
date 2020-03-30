import { buildSchema } from 'graphql';

export default buildSchema(`
    input TestInput {
        name: String!
    }

    type RootQuery {
        test: String!
    }

    type RootMutation {
        tester(testInput: TestInput): String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
