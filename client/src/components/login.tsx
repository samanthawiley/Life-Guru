import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import LoginForm from './login-form';
import ApolloClient from 'apollo-client';
import * as LoginTypes from './tiles/login';

export const LOGIN_USER = gql`
  mutation login($id: String!) {
    login(id: $id)
  }
`;

export default function Login() {
  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        localStorage.setItem('token', login as string);
        client.writeData({ data: { isLoggedIn: true } });
      }
    }
  );

  if (loading) return <p>Loading</p>;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}