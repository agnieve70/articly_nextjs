import React, { Fragment } from 'react';
import MainNavigation from './main-navigation';

function Layout(props) {
  return (
    <Fragment>
        <main>
            <MainNavigation />
            {props.children}
        </main>
    </Fragment>
  )
}

export default Layout;