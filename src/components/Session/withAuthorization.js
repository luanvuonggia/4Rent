import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'recompose';

import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return this.props.sessionStore.authUser ? <Component /> : null;
    }
  }

  const mapStateToProps = (state) => {
    return {
      sessionStore : state.sessionStore
    }
  }


  return compose(
    withRouter,
    connect(mapStateToProps, null),
  )(WithAuthorization);
}

export default withAuthorization;