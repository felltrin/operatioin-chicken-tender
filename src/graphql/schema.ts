export const typeDefs = `#graphql
  scalar DateTime

  type Movie {
    id: ID!,
    fullplot: String,
    imdb: IMDB!,
    year: Int!,
    plot: String,
    genres: [String!],
    rated: String!,
    metacritic: Int!,
    title: String!,
    lastupdated: String!,
    languages: [String!],
    writers: [String!],
    type: String,
    tomatoes: Tomatoes,
    poster: String,
    num_mflix_comments: Int!,
    released: String,
    awards: Awards!,
    countries: [String!],
    cast: [String],
    runtime: Int!,
    directors: [String!],  
  }

  type Awards {
    wins: Int!,
    nominations: Int!,
    text: String!,
  }

  type IMDB {
    rating: Float!,
    votes: Int!,
    id: Int!,
  }

  type Viewer {
    rating: Float!,
    numReviews: Int!,
    meter: Int!,
  }

  type Critic {
    rating: Float!,
    numReviews: Int!,
    meter: Int!,
  }

  type Tomatoes {
    viewer: Viewer!,
    fresh: Int!,
    critic: Critic!,
    rotten: Int!,
    lastUpdated: String,
  }

  type Comment {
    id: ID!,
    name: String!,
    email: String!,
    movie_id: ID!,
    text: String!,
    date: DateTime,
  }

  type Query {
    movies: [Movie],
    movie(id: ID!): Movie,
    comments: [Comment],
    comment(id: ID!): Comment, 
  }
`;
