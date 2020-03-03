import React, { Component } from 'react';
import { Table, Button, Divider, Row, Col, message, Popconfirm} from 'antd';
import { firebase } from '../../firebase';
import _ from 'lodash';
import OrderDetails from './OrderDetails';

import {
  BrowserRouter as Router,
  Link,
  Route,
} from "react-router-dom";

const success = () => {
  message.success('Success!')
};


class Order extends Component {
constructor(props) {
      super(props);
      this.state = {
        visible: false,
        isEdit: false,
        DonHangEdit: {}
      }
  }

  columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Customer',
  dataIndex: 'cusID',
  key: 'cusID',
  render: (text, record) => (
    <div>
    {
      _.get(_.find(this.props.customers, ['cusID', _.toNumber(text)]), 'name', '')
    }
    </div>
  )
}, {
  title: 'Sumary',
  dataIndex: 'sum',
  key: 'sum',
}, {
  title: 'Note',
  dataIndex: 'note',
  key: 'note',
}, {
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <Router>
        <Route path='/order-details'>
          <OrderDetails />
        </Route>
      </Router>

      
      <Divider type="vertical" />
      <Popconfirm title="Delete?" onConfirm={() => this.onDelete(record.maDH)} okText="Yes" cancelText="Cancel">
      <a>Delete</a>
      </Popconfirm>
    </span>
  )}];


  onDelete = (id) => {
    firebase.update(`Order/${id}`, null);
    this.props.getLatestData();
  }

  // onUpdate = (maDH) => {
  //   this.setState({
  //     isEdit: true,
  //     DonHangEdit: _.find(this.props.dsDonHang, ['maDH', maDH])
  //   }, () => {
  //     this.setState({
  //       visible: true
  //     })
  //   })
  // }

  // onCreate = () => {
  //   const form = this.form;
  //     form.validateFields((err, values) => {
  //       if (err) {
  //         return;
  //       }
  //       form.resetFields();     
  //       firebase.getLastIndex('DonHang').then((lastIndex) => this.addDonHang(lastIndex, values))
  //       success()
  //       this.setState({
  //         visible: false,
  //       });
  //     });
  // }

  // addDonHang = (lastIndex, values) => {

  //     let newIndex = parseInt(lastIndex) + 1
  //     if(this.state.isEdit) {
  //       newIndex = this.state.DonHangEdit.maDH
  //     }
  //     let newDonHang = {
  //       maDH: newIndex,    
  //       cusID: values.khachHang || 0,
  //       noBanDau: values.noBanDau || 0,
  //       conNo: values.conNo || values.noBanDau || 0,
  //       tongTien: values.tongTien || 0,
  //       ngayGio: Date.now(),
  //       note: values.note || ''
  //     }
  //     firebase.update(`DonHang/${newIndex}`, newDonHang);
  //     this.props.getLatestData();
  // }

  // onCancel = (e) => {
  //     const form = this.form;
  //     form.resetFields();
  //     this.setState({
  //       visible: false,
  //       isEdit: false,
  //       DonHangEdit: {}
  //     });

  // }

  render() {
    return ( 
      <div>
        <Row type='flex' justify='space-between' style={{ height: '100%' }}>
        <Col> 
          <Link to='/add-order'>
          <Button type='primary' icon='plus-circle-o'>Add</Button>
          </Link>
        </Col>
        <Col>
          <Button type='primary' icon='file-excel'>Export</Button>
        </Col>
        </Row>
        <Table dataSource={this.props.orders} columns={this.columns} pagination={false} />
      </div>
    );
  }
}


export default Order;