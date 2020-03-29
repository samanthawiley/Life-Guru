import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;
