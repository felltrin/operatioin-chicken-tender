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
    movie: async (_: any, { id }: any) => {
      const response = await fetch(`http://localhost:3000/api/movies/${id}`);
      if (response.status === 404) {
        throw new Error("Movie not found");
      }
      const movie = await response.json();
      return {
        id: movie._id,
        ...movie,
      };
    },
  },
};
