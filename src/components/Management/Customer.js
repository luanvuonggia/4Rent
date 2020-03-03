import React, { Component } from 'react';
import { Table, Button, message, Divider, Popconfirm } from 'antd';
import { firebase } from '../../firebase';
import _ from 'lodash';
import CustomerForm from '../Form/CustomerForm';

const success = () => {
  message.success('Success')
};


class Customer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        visible: false
      }
  }

  columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Phone',
  dataIndex: 'phone',
  key: 'phone',
} , {
  title: 'Note',
  dataIndex: 'note',
  key: 'note',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a onClick={()=>this.onUpdate(record.cusID)}>Update</a>
      <Divider type='vertical' />
      <Popconfirm title='Delete?' onConfirm={() => this.onDelete(record.cusID)} okText='Ok' cancelText='Cancel'>
      <a>Delete</a>
      </Popconfirm>
    </span>
  )}];


  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  onDelete = (cusID) => {
    firebase.update(`Customer/${cusID}`, null);
    this.props.getLatestData();
  }

  onUpdate = (cusID) => {
    this.setState({
      isEdit: true,
      cusEdit: _.find(this.props.Customers, ['cusID', cusID])
    }, () => {
      this.setState({
        visible: true
      })
    })
  }

  onCreate = () => {
    const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        form.resetFields();
        firebase.getLastIndex('Customer').then((lastIndex) => this.addCustomer(lastIndex, values))
        success()
        this.setState({
          visible: false,
        });
      });
  }

  addCustomer = (lastIndex, values) => {
      let newIndex = parseInt(lastIndex) + 1;;
      if(this.state.isEdit) {
        newIndex = this.state.cusEdit.cusID;
      }
      let newCustomer= {
        cusID: newIndex,    
        name: values.name,
        phone: values.phone || '',
        note: values.note || ''
      }
      firebase.update(`Customer/${newIndex}`, newCustomer);
      this.props.getLatestData();
  }

  onCancel = (e) => {
      const form = this.form;
      form.resetFields();
      this.setState({
        visible: false,
        isEdit: false,
        cusEdit: {}
      });

  }

  saveFormRef = (form) => {
      this.form = form;
  }

  render() {
    return (
      <div>
        <CustomerForm
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.onCancel}
                onCreate={this.onCreate}
                isEdit={this.state.isEdit}
                cusEdit={this.state.cusEdit}
        />
        <Button type='primary' onClick={this.showModal}>Add new</Button> 
        <Table dataSource={this.props.Customers} columns={this.columns} />
      </div>
    );
  }
}


export default Customer;