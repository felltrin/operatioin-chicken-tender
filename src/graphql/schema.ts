export const typeDefs = `#graphql
  type User {
    id: ID!,
    name: String!,
    email: String!,
    password: String!,
  }

  type Query {
    users: [User],
    user(id: ID!): User,
  }
`;
