export const typeDefs = `#graphql
  scalar Date

  type User {
    id: ID!,
    username: String!,
    email: String!,
    password: String!,
    createdAt: Date!,
  }
  
  type Query {
    users: [User],
    user(id: ID!): User,
  }
`;
