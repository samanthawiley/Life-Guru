import React, { Fragment } from 'react';

import Posts from './posts';
import PageContainer from './page-container';
// import Footer from './footer';

export default function Home() {
  return (
    <Fragment>
      <PageContainer>
        <Posts/>
        {/* <Router primary={false} component={Fragment}>
          <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" />
        </Router> */}
      </PageContainer>
      {/* <Footer /> */}
    </Fragment>
  );
}
