import React, { Component } from 'react';
import { Table, message, Button, Divider, Popconfirm, Tag } from 'antd';
import { firebase } from '../../firebase';
import _ from 'lodash';
import ProductForm from '../Form/ProductForm'

const success = () => {
  message.success('Thành công')
};

class Product extends Component {
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
  title: 'Price',
  dataIndex: 'price',
  key: 'price',
},  {
  title: 'Available',
  dataIndex: 'available',
  key: 'available',
  render: available => (
    <Tag color={available? 'green' : 'red'}>
        {_.toString(available)}
    </Tag>
  )
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a onClick={()=>this.onUpdate(record.maSP)}>Update</a>
      <Divider type='vertical' />
      <Popconfirm title='Delete this product?' onConfirm={() => this.onDelete(record.maSP)} okText='Ok' cancelText='Cancel'>
      <a>Xóa</a>
      </Popconfirm>
    </span>
  )}];

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  onDelete = (maSP) => {
    firebase.update(`Product/${maSP}`, null);
    this.props.getLatestData();
  }

  onUpdate = (maSP) => {
    this.setState({
      isEdit: true,
      ProductEdit: _.find(this.props.dsProduct, ['maSP', maSP])
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
        firebase.getLastIndex('Product').then((lastIndex) => this.addProduct(lastIndex, values))
        success()
        this.setState({
          visible: false,
        });
      });
  }

  addProduct = (lastIndex, values) => {
      let newIndex = parseInt(lastIndex) + 1;
      if(this.state.isEdit) {
        newIndex = this.state.ProductEdit.maSP;
      }
      let newProduct = {   
        name: values.name,
        price: values.price,
        available: true
      }
      firebase.update(`Product/${newIndex}`, newProduct);
      this.props.getLatestData();
  }

  onCancel = (e) => {
      const form = this.form;
      form.resetFields();
      this.setState({
        visible: false,
        isEdit: false,
        ProductEdit: {}
      });

  }


  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      return callback();
    }
    callback('Price must greater than zero!');
  };

  saveFormRef = (form) => {
      this.form = form;
  }
  render() {
    return (      
        <div>
        <ProductForm
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.onCancel}
                onCreate={this.onCreate}
                isEdit={this.state.isEdit}
                ProductEdit={this.state.ProductEdit}
                checkPrice={this.checkPrice}
        />
        <Button type='primary' onClick={this.showModal}>Add Product</Button> 
        <Table dataSource={this.props.dsProduct} columns={this.columns} />
      </div>
    );
  }
}


export default Product;