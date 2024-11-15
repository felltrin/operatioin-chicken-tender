export const typeDefs = `#graphql
  type Movie {
    id: ID!,
    plot: String,
    genres: [String]
    runtime: Int!,
    cast: [String],
    poster: String,
    title: String,
    fullplot: String,
    languages: [String],
    directors: [String],
    rated: [String],
    num_mflix_comments: Int,
  }

  type Query {
    movies: [Movie],
    movie(id: ID!): Movie,
  }
`;
