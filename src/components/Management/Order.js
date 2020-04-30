import React, { Component } from 'react';
import { Table, Button, Divider, Row, Col, message, Popconfirm} from 'antd';
import { PlusCircleOutlined, DownloadOutlined  } from '@ant-design/icons';
import { firebase } from '../../firebase';
import _ from 'lodash';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from "react-router-dom";

// const success = () => {
//   message.success('Success!')
// };


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
  title: 'Total',
  dataIndex: 'total',
  key: 'total',
}, {
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to='/add-order'> 
      <a>Details</a>
      </Link>

      
      <Divider type="vertical" />
      <Popconfirm title="Delete?" onConfirm={() => this.onDelete(record.id)} okText="Yes" cancelText="Cancel">
      <a>Delete</a>
      </Popconfirm>
    </span>
  )}];


  onDelete = (id) => {
    firebase.update(`Order/${id}`, null);
    this.props.getLatestData();
  }

  render() {
    return ( 
      <div>
        <Row type='flex' justify='space-between' style={{ height: '100%' }}>
        <Col> 
          <Link to='/add-order'>
          <Button type='primary' className='btn' icon={<PlusCircleOutlined/>}>Add</Button>
          </Link>
        </Col>
        <Col>
          <Button type='primary' className='btn' icon={<DownloadOutlined />}>Export</Button>
        </Col>
        </Row>
        <Table dataSource={this.props.orders} columns={this.columns} pagination={false} />
      </div>
    );
  }
}


export default Order;