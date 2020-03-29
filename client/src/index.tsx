import React from 'react';
import { render } from 'react-dom';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

import Home from './components/home';
import Login from './components/login';
import { typeDefs } from './resolvers';

// const POSTS = gql`
// {
//     posts {
//         id
//       user {
//         id
//       }
//       createdAt
//     }
// }
// `;

// function Posts() {
//     const { loading, error, data } = useQuery(POSTS);
  
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error :(</p>;
  
//     return data.posts.map(({ id, user }) => (
//       <div key={id}>
//         <p>
//           {id}: {user.id}
//         </p>
//       </div>
//     ));
//   }

const cache = new InMemoryCache();
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  typeDefs,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Home /> : <Login />;
}

const App = () => (
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));