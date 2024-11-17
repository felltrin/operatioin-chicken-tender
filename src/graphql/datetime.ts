import { GraphQLScalarType, Kind } from "graphql";

const DateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "DateTime scalar type for ISO-8601 dates with timezone",

  serialize(value: Date) {
    return value.toISOString(); // Convert outgoing Date to ISO string
  },

  parseValue(value: string) {
    return new Date(value); // Parse incoming ISO string to Date
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export default DateTimeScalar;
