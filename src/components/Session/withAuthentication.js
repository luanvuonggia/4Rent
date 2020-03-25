import React from 'react';
import { connect } from 'react-redux'
import { firebase } from '../../firebase';
import { setSessionStore } from '../../actions';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { sessionStore, setAuthUser } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? setAuthUser(authUser) // Set auth to props
          : setAuthUser(null);
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      sessionStore: state.sessionStore
    }
  }

  const mapDispatchToProps = (dispatch, props) => {
    return {
      setAuthUser : (authUser) => {
        dispatch(setSessionStore(authUser));
      }
    }
  }


  return connect(mapStateToProps,mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;