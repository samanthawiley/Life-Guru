const { ApolloError, ValidationError } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const admin = require('./firebase');

const resolvers = {
    Query: {
      async posts() {
        const posts = await admin
          .firestore()
          .collection('Posts')
          .get();
        return posts.docs.map(post => post.data());
      },
      async user(_, { id }) {
        try {
          const userDoc = await admin
            .firestore()
            .doc(`Users/${id}`)
            .get();
          const user = userDoc.data();
          return user || new ValidationError('User ID not found');
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    },
    User: {
      async posts(user) {
        try {
          const userPosts = await admin
            .firestore()
            .collection('Posts')
            .where('userId', '==', user.id)
            .get();
          return userPosts.docs.map(post => post.data());
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    },
    Post: {
      async user(post) {
        try {
          const postAuthor = await admin
            .firestore()
            .doc(`Users/${post.userId}`)
            .get();
          return postAuthor.data();
        } catch (error) {
          throw new ApolloError(error);
        }
      },
      async comments(post) {
        try {
            const postComments = await admin
              .firestore()
              .collection('Comments')
              .where('postId', '==', post.id)
              .get();
            return postComments.docs.map(comment => comment.data());
        } catch (error) {
            throw new ApolloError(error);
        }
      }
    },
    Comment: {
        async user(comment) {
          try {
            const commentAuthor = await admin
              .firestore()
              .doc(`Users/${comment.userId}`)
              .get();
            return commentAuthor.data();
          } catch (error) {
            throw new ApolloError(error);
          }
        },
        async post(comment) {
            try {
              const post = await admin
                .firestore()
                .doc(`Posts/${comment.postId}`)
                .get();
              return post.data();
            } catch (error) {
              throw new ApolloError(error);
            }
        },
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
          return FirebaseFirestore.Timestamp.fromDate(value); // value from the client
        },
        serialize(value) {
          return value.toDate(); // value sent to the client
        },
        // parseLiteral(ast) {
        //   if (ast.kind === Kind.INT) {
        //     return new Date(ast.value) // ast value is always in string format
        //   }
        //   return null;
        // },
    }),
    Mutation: {
      login: async (_, { id }) => {
        try {
          const userDoc = await admin
            .firestore()
            .doc(`Users/${id}`)
            .get();
          const user = userDoc.data();
          return user.id || new ValidationError('User ID not found');
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    },
  };

module.exports = resolvers;
