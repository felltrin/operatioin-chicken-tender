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
      const response = await fetch(`http://localhost:3000/api/movies`);
      if (response.status === 404) {
        throw new Error("Users not found");
      }
      const movies = await response.json();
      return movies.find((movie: any) => movie._id === id);
    },
    users: async () => {
      const response = await fetch("http://localhost:3000/api/users");
      const users = await response.json();
      return users.map((user: any) => ({
        id: user._id,
        ...user,
      }));
    },
    user: async (_: any, { id }: any) => {
      const response = await fetch(`http://localhost:3000/api/users`);
      if (response.status === 404) {
        throw new Error("Users not found");
      }
      const users = await response.json();
      return users.find((user: any) => user._id === id);
    },
  },
};
