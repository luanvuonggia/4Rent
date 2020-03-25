import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'recompose';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

const AccountPage = ({ sessionStore }) =>
  <div>
    <h1>Account: {sessionStore.authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

const authCondition = (authUser) => !!authUser;
const mapStateToProps = state => {
  return {
    sessionStore : state.sessionStore
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, null),
)(AccountPage);