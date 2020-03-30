import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Header from './header';
// import PostTile from './post-tile';

const POSTS = gql`
{
    posts {
        id
        text
      user {
        id
      }
      createdAt
      comments {
        id
        text
        user {
            id
        }
      }
    }
}
`;

export default function Posts() {
    const { loading, error, data } = useQuery(POSTS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
        <Fragment>
            <Header />
            {/* {data.posts &&
            data.posts.map((post: any) => (
                <PostTile key={post.id} launch={post} />
            ))} */}
        </Fragment>
        );
}

