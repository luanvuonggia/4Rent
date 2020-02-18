import React, { Component } from 'react';
import { Table, message, Button, Divider, Popconfirm, Tag } from 'antd';
import { firebase } from '../../firebase';
import _ from 'lodash';
import SanPhamForm from '../Form/SanPhamForm'

const success = () => {
  message.success('Thành công')
};

class SanPham extends Component {
  constructor(props) {
      super(props);
      this.state = {
        visible: false
      }
  }

  columns = [{
  title: 'Tên SP',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Giá Thuê',
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
      <a onClick={()=>this.onUpdate(record.maSP)}>Cập Nhật</a>
      <Divider type="vertical" />
      <Popconfirm title="Bạn muốn xóa sản phẩm này?" onConfirm={() => this.onDelete(record.maSP)} okText="Đồng ý" cancelText="Hủy">
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
    firebase.update(`SanPham/${maSP}`, null);
    this.props.getLatestData();
  }

  onUpdate = (maSP) => {
    this.setState({
      isEdit: true,
      SanPhamEdit: _.find(this.props.dsSanPham, ['maSP', maSP])
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
        firebase.getLastIndex('SanPham').then((lastIndex) => this.addSanPham(lastIndex, values))
        success()
        this.setState({
          visible: false,
        });
      });
  }

  addSanPham = (lastIndex, values) => {
      let newIndex = parseInt(lastIndex) + 1;
      if(this.state.isEdit) {
        newIndex = this.state.SanPhamEdit.maSP;
      }
      let newSanPham = {
        maSP: newIndex,    
        tenSP: values.ten,
        gia: values.gia,
      }
      firebase.update(`SanPham/${newIndex}`, newSanPham);
      this.props.getLatestData();
  }

  onCancel = (e) => {
      const form = this.form;
      form.resetFields();
      this.setState({
        visible: false,
        isEdit: false,
        SanPhamEdit: {}
      });

  }

  saveFormRef = (form) => {
      this.form = form;
  }
  render() {
    return (      
        <div>
        <SanPhamForm
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.onCancel}
                onCreate={this.onCreate}
                isEdit={this.state.isEdit}
                SanPhamEdit={this.state.SanPhamEdit}
        />
        <Button type='primary' onClick={this.showModal}>Thêm Sản Phẩm</Button> 
        <Table dataSource={this.props.dsSanPham} columns={this.columns} />
      </div>
    );
  }
}


export default SanPham;