import React, { Component } from 'react';
import Anchor from 'grommet/components/Anchor';
import { LoginButton, LogoutButton, UserMenu, UserNavigation } from 'zooniverse-react-components';

import { config } from '../config';
import { UserContext } from '../context/UserContext';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.props.signIn();
  }

  logout() {
    this.props.signOut();
  }

  render() {
    let menuItems;

    if (this.props.user && this.props.initialised) {
      const login = this.props.user.login;
      menuItems = [
        <Anchor href={`${config.zooniverse}/users/${login}`}>Profile</Anchor>,
        <Anchor href={`${config.zooniverse}/settings`}>Settings</Anchor>,
        <Anchor href={`${config.zooniverse}/collections/${login}`}>Collections</Anchor>,
        <Anchor href={`${config.zooniverse}/favorites/${login}`}>Favorites</Anchor>,
        <LogoutButton logout={this.logout} />,
      ];
    }

    return (this.props.user) ? (
      <div>
        <UserNavigation />
        <UserMenu user={this.props.user} userMenuNavList={menuItems} />
      </div>
    ) : (
      <div>
        <LoginButton toggleModal={this.login} />
      </div>
    );
  }
}

const AuthContainer = () => (
  <UserContext.Consumer>
    {context => (
      <Auth {...context} />
    )}
  </UserContext.Consumer>
);

export default AuthContainer;

// TODO
// - refactor to one component?
// - add types validation and defaults