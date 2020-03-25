import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { Layout, Menu, Breadcrumb, Button, Table, Spin } from 'antd';
import withAuthorization from '../Session/withAuthorization';
import { db, firebase } from '../../firebase';
import Product from '../Management/Product'
import Order from '../Management/Order'
import Customer from '../Management/Customer'
import { setUserStore } from '../../actions';
import _ from 'lodash';

const { Header, Content, Footer } = Layout;

class HomePage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dsDonHang: [],
        currentNav: 'sp',
        loading: true
      }
  }

  filterUndefinedObjects = (objects) =>
    _.filter(objects, (o) => { return _.isObject(o) })

  componentDidMount() {
    const { userStore, setUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      setUsers(snapshot.val()) // set user     
    );
    this.getLatestData();
    
  }

  getLatestData = () => {
    Promise.all([
      firebase.getData('Customer'),
      firebase.getData('Order'),
      firebase.getData('Product')]
      ).then(([Customer, Order, Product]) => {
        this.setState({
          Customer: this.filterUndefinedObjects(Customer) || [],
          Order: this.filterUndefinedObjects(Order) || [],
          Product: this.filterUndefinedObjects(Product) || [],
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
        return <Order orders={this.state.Order} customers={this.state.Customer} getLatestData={this.getLatestData}/>;
      case 'kh':
        return <Customer Customers={this.state.Customer} getLatestData={this.getLatestData}/>;
      case 'sp':
        return <Product dsProduct={this.state.Product} getLatestData={this.getLatestData}/>;
      default:
        break;
    }
    
  }

  render() {
    // const { users } = this.props.userStore;

    return (
      <Layout className='layout'>
        <Header>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['sp']}
            style={{ lineHeight: '64px' }}
            onClick={this.onChangeNav}
          >
            
            <Menu.Item key='sp'>Products</Menu.Item>
            <Menu.Item key='kh'>Customer</Menu.Item>
            <Menu.Item key='dh'>Orders</Menu.Item>
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
          4Rent ©2020 Created by Luan Vuong
        </Footer>
  </Layout>
    );
  }
}

// const UserList = ({ users }) =>
//   <div>
//     <h2>List of Usernames of Users</h2>
//     <p>(Saved on Sign Up in Firebase Database)</p>

//     {Object.keys(users).map(key =>
//       <div key={key}>{users[key].username}</div>
//     )}
//   </div>

const authCondition = (authUser) => !!authUser;
const mapStateToProps = (state) => {
  return {
    userStore : state.userStore
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setUsers : (authUser) => {
      dispatch(setUserStore(authUser));
    }
  }
}
export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);