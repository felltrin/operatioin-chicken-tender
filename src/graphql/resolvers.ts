export const resolvers = {
  Query: {
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
