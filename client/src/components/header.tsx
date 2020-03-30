import React, { Fragment } from 'react';
import styled from '@emotion/styled'
import { size } from 'polished';

import { unit, colors } from '../styles';
import lifeGuru from '../images/life-guru.png';
import LogoutButton from './logout-button';

interface HeaderProps {
  image?: string | any;
  children?: any;
}

const Header: React.FC<HeaderProps> = ({ image, children = 'Life Guru' }) => {
  const username = localStorage.getItem('token') as string;
  const avatar = image || lifeGuru;

  return (
    <Fragment>
      <Container>
        <Image round={!image} src={avatar} alt="Life guru" />
        <div>
          <h2>{children}</h2>
          <Subheading>{username}</Subheading>
        </div>
        <LogoutButton />
      </Container>
    </Fragment>
  );
}

export default Header;

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: unit * 4.5,
});

const Image = styled('img')(size(134), (props: { round: boolean }) => ({
  marginRight: unit * 2.5,
  borderRadius: props.round ? '50%' : '0%',
}));

const Subheading = styled('h5')({
  marginTop: unit / 2,
  color: colors.textSecondary,
});
