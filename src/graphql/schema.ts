export const typeDefs = `#graphql
  scalar Date

  type User {
    id: ID!,
    username: String!,
    email: String!,
    password: String!,
    createdAt: Date!,
  }

  type AuthPayload {
    success: Boolean!,
    message: String,
    token: String,
  }

  type Query {
    users: [User],
    user(id: ID!): User,
    userByEmail(email: String!): User,
  }

  type Mutation {
    verifyForgotPassword(email: String!): AuthPayload!,
    resetPassword(email: String!, token: String!, newPassword: String!): AuthPayload!
  }

`;
