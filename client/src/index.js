import React from 'react';
import { render } from 'react-dom';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

const POSTS = gql`
{
    posts {
        id
      user {
        id
      }
      createdAt
    }
}
`;

function Posts() {
    const { loading, error, data } = useQuery(POSTS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.posts.map(({ id, user }) => (
      <div key={id}>
        <p>
          {id}: {user.id}
        </p>
      </div>
    ));
  }


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <Posts />
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));