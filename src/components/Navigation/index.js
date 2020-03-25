import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import logo from '../../img/4rent.png';
import { Row, Col, Avatar} from 'antd';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = ({ sessionStore }) =>
  <div>
    { sessionStore.authUser
        ? <NavigationAuth email={sessionStore.authUser.email} />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = ({email}) =>
    <Row justify="space-between" align="middle">
      <Col span={6}><Link to={routes.HOME}><Avatar shape="square" size={64} src={logo} /></Link></Col>
      <Col span={8}></Col>
      <Col span={4}></Col>
      <Col span={6}><div>{email+' '}<SignOutButton /></div></Col>
    </Row>

const NavigationNonAuth = () =>
    <Row justify="space-between" align="middle">
      <Col span={6}><Link to={routes.LANDING}><Avatar shape="square" size={64} src={logo} /></Link></Col>
      <Col span={8}></Col>
      <Col span={4}></Col>
      <Col span={6}><Link to={routes.SIGN_IN}>Sign In</Link></Col>
    </Row>
const mapStateToProps = state => {
  return {
    sessionStore : state.sessionStore
  }
}
export default compose(
  connect(mapStateToProps, null),
)(Navigation);
