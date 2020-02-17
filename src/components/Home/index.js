import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Layout, Menu, Breadcrumb, Button, Table, Spin } from 'antd';
import withAuthorization from '../Session/withAuthorization';
import { db, firebase } from '../../firebase';
import DonHang from '../Management/DonHang'
import KhachHang from '../Management/KhachHang'
import SanPham from '../Management/SanPham'
import _ from 'lodash';

const { Header, Content, Footer } = Layout;

class HomePage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dsDonHang: [],
        currentNav: 'dh',
        loading: true
      }
  }

  filterUndefinedObjects = (objects) =>
    _.filter(objects, (o) => { return _.isObject(o) })

  componentDidMount() {
    const { userStore } = this.props;

    db.onceGetUsers().then(snapshot =>
      userStore.setUsers(snapshot.val())     
    );
    this.getLatestData();
    
  }

  getLatestData = () => {
    Promise.all([
      firebase.getData('DonHang'),
      firebase.getData('KhachHang'),
      firebase.getData('SanPham')]
      ).then(([DonHang, KhachHang, SanPham]) => {
        this.setState({
          DonHang: this.filterUndefinedObjects(DonHang) || [],
          KhachHang: this.filterUndefinedObjects(KhachHang) || [],
          SanPham: this.filterUndefinedObjects(SanPham) || [],
          loading: false
        })
    })
  }

  onChangeNav = (e) => {
    this.setState({
      currentNav: e.key
    })
  }

  renderContent = () => {
    switch(this.state.currentNav) {
      case 'dh':
        return <DonHang dsDonHang={this.state.DonHang} listKhachHang={this.state.KhachHang} getLatestData={this.getLatestData}/>;
      case 'kh':
        return <KhachHang dsKhachHang={this.state.KhachHang} getLatestData={this.getLatestData}/>;
      case 'sp':
        return <SanPham dsSanPham={this.state.SanPham} getLatestData={this.getLatestData}/>;
      default:
        break;
    }
    
  }

  render() {
    const { users } = this.props.userStore;

    return (
      <Layout className='layout'>
        <Header>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['dh']}
            style={{ lineHeight: '64px' }}
            onClick={this.onChangeNav}
          >
            <Menu.Item key='dh'>Đơn Hàng</Menu.Item>
            <Menu.Item key='sp'>Sản Phẩm</Menu.Item>
            <Menu.Item key='kh'>Khách Hàng</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {
            this.state.loading ? <Spin tip='Loading...'/> : this.renderContent()
          }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}> 
          Sales Management ©2018 Created by L
        </Footer>
  </Layout>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  inject('userStore'),
  observer
)(HomePage);