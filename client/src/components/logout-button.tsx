import React from 'react';
import styled from '@emotion/styled'
import { useApolloClient } from '@apollo/react-hooks';
import { colors, unit } from '../styles';
import { ReactComponent as ExitIcon } from '../images/exit.svg';

export default function LogoutButton() {
  const client = useApolloClient();
  return (
    <StyledButton
      onClick={() => {

        client.writeData({ data: { isLoggedIn: false } });
        localStorage.clear();
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
}

const StyledButton = styled('button')({
    flexGrow: 1,
    width: 0,
    fontFamily: 'inherit',
    fontSize: 10,
    color: 'inherit',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    svg: {
    display: 'block',
    width: 30,
    margin: `0 auto ${unit}px`,
    fill: colors.secondary,
    },
    background: 'none',
    border: 'none',
    padding: 0,
});
