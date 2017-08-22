import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith', gender: 1 },
  { id: 2, name: 'Sara Smith', gender: 0 },
  { id: 3, name: 'Budd Deey', gender: 1 },
];

const GenderType = new GraphQLEnumType({
  name: 'GENDER',
  values: {
    FEMALE: { value: 0 },
    MALE: { value: 1 },
  }
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      args: {
        gender: {
          name: 'gender',
          type: GenderType,
        }
      },
      resolve: (source, args) => {
        if (args.gender) {
          return peopleData.filter(p => p.gender === args.gender);
        }
        return peopleData;
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
