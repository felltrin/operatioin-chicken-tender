export const resolvers = {
  Query: {
    movies: async () => {
      const response = await fetch("http://localhost:3000/api/movies");
      const movies = await response.json();
      return movies.map((movie: any) => ({
        id: movie._id,
        ...movie,
      }));
    },
    movie: async (_, { id }) => {
      const response = await fetch(`http://localhost:3000/api/movies`);
      if (response.status === 404) {
        throw new Error("Movies not found");
      }
      const movies = await response.json();
      return movies.find((movie) => movie._id === id);
    },
    comments: async () => {
      const response = await fetch("http://localhost:3000/api/comments");
      const comments = await response.json();
      return comments.map((comment: any) => ({
        id: comment._id,
        ...comment,
      }));
    },
    comment: async (_, { id }) => {
      const response = await fetch(`http://localhost:3000/api/comments`);
      if (response.status === 404) {
        throw new Error("Comments not found");
      }
      const comments = await response.json();
      return comments.find((comment) => comment._id === id);
    },
  },
};
