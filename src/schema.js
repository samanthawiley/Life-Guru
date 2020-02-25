import { gql } from 'apollo-server';

const typeDefs = gql`
    scalar Date

    # A User
    type User {
        id: ID!
        email: String!
        posts: [Posts]
    }
    # A Post Object
    type Post {
        id: ID!
        text: String!
        userId: String!
        user: User!
        comments: [Comment]
        createdAt: Date!
    }
    # A Comment Object
    type Comment {
        id: ID!
        text: String!
        userId: String!
        user: User!
        postId: String!
        post: Post!
        createdAt: Date!
    }
    type Query {
        posts: [Post]
        user(id: String!): User
    }
`;

module.exports = typeDefs;
