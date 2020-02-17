import React, { Component } from 'react';
import { Table, Button, message, Divider, Popconfirm } from 'antd';
import { firebase } from '../../firebase';
import _ from 'lodash';
import KhachHangForm from '../Form/KhachHangForm';

const success = () => {
  message.success('Thành công')
};


class DonHang extends Component {
  constructor(props) {
      super(props);
      this.state = {
        visible: false
      }
  }

  columns = [{
  title: 'Mã Khách Hàng',
  dataIndex: 'maKH',
  key: 'maKH',
}, {
  title: 'Tên KH',
  dataIndex: 'ten',
  key: 'ten',
}, {
  title: 'SĐT',
  dataIndex: 'sdt',
  key: 'sdt',
} , {
  title: 'Ghi Chú',
  dataIndex: 'note',
  key: 'note',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a onClick={()=>this.onUpdate(record.maKH)}>Cập Nhật</a>
      <Divider type="vertical" />
      <Popconfirm title="Bạn muốn xóa khách hàng này?" onConfirm={() => this.onDelete(record.maKH)} okText="Đồng ý" cancelText="Hủy">
      <a>Xóa</a>
      </Popconfirm>
    </span>
  )}];


  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  onDelete = (maKH) => {
    firebase.update(`KhachHang/${maKH}`, null);
    this.props.getLatestData();
  }

  onUpdate = (maKH) => {
    this.setState({
      isEdit: true,
      KhachHangEdit: _.find(this.props.dsKhachHang, ['maKH', maKH])
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
        firebase.getLastIndex('KhachHang').then((lastIndex) => this.addKhachHang(lastIndex, values))
        success()
        this.setState({
          visible: false,
        });
      });
  }

  addKhachHang = (lastIndex, values) => {
      let newIndex = parseInt(lastIndex) + 1;
      if(this.state.isEdit) {
        newIndex = this.state.KhachHangEdit.maKH;
      }
      let newKhachHang = {
        maKH: newIndex,    
        ten: values.ten,
        sdt: values.sdt || '',
        note: values.note || ''
      }
      firebase.update(`KhachHang/${newIndex}`, newKhachHang);
      this.props.getLatestData();
  }

  onCancel = (e) => {
      const form = this.form;
      form.resetFields();
      this.setState({
        visible: false,
        isEdit: false,
        KhachHangEdit: {}
      });

  }

  saveFormRef = (form) => {
      this.form = form;
  }

  render() {
    return (
      <div>
        <KhachHangForm
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.onCancel}
                onCreate={this.onCreate}
                isEdit={this.state.isEdit}
                KhachHangEdit={this.state.KhachHangEdit}
        />
        <Button type='primary' onClick={this.showModal}>Thêm Khách Hàng</Button> 
        <Table dataSource={this.props.dsKhachHang} columns={this.columns} />
      </div>
    );
  }
}


export default DonHang;