import React, { Component } from 'react';
import { Table, Button, Divider, Row, Col, message, Popconfirm} from 'antd';
import { firebase } from '../../firebase';
import _ from 'lodash';
import DonHangForm from '../Form/DonHangForm';

const success = () => {
  message.success('Thành công!')
};

class DonHang extends Component {
constructor(props) {
      super(props);
      this.state = {
        visible: false,
        isEdit: false,
        DonHangEdit: {}
      }
  }

  columns = [{
  title: 'Mã Đơn Hàng',
  dataIndex: 'maDH',
  key: 'maDH',
}, {
  title: 'Khách Hàng',
  dataIndex: 'maKH',
  key: 'maKH',
  render: (text, record) => (
    <div>
    {
      _.get(_.find(this.props.listKhachHang, ['maKH', _.toNumber(text)]), 'ten', '')
    }
    </div>
  )
}, {
  title: 'Tổng Cộng',
  dataIndex: 'tongTien',
  key: 'tongTien',
}, {
  title: 'Nợ Ban Đầu',
  dataIndex: 'noBanDau',
  key: 'noBanDau',
}, {
  title: 'Còn Nợ',
  dataIndex: 'conNo',
  key: 'conNo',
}, {
  title: 'Ghi Chú',
  dataIndex: 'note',
  key: 'note',
}, {
  title: 'Ngày Bán',
  dataIndex: 'ngayGio',
  key: 'ngayGio',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a onClick={()=>this.onUpdate(record.maDH)}>Cập Nhật</a>
      <Divider type="vertical" />
      <Popconfirm title="Bạn muốn xóa đơn hàng này?" onConfirm={() => this.onDelete(record.maDH)} okText="Đồng ý" cancelText="Hủy">
      <a>Xóa</a>
      </Popconfirm>
    </span>
  )}];

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  onDelete = (maDH) => {
    firebase.update(`DonHang/${maDH}`, null);
    this.props.getLatestData();
  }

  onUpdate = (maDH) => {
    this.setState({
      isEdit: true,
      DonHangEdit: _.find(this.props.dsDonHang, ['maDH', maDH])
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
        firebase.getLastIndex('DonHang').then((lastIndex) => this.addDonHang(lastIndex, values))
        success()
        this.setState({
          visible: false,
        });
      });
  }

  addDonHang = (lastIndex, values) => {

      let newIndex = parseInt(lastIndex) + 1
      if(this.state.isEdit) {
        newIndex = this.state.DonHangEdit.maDH
      }
      let newDonHang = {
        maDH: newIndex,    
        maKH: values.khachHang || 0,
        noBanDau: values.noBanDau || 0,
        conNo: values.conNo || values.noBanDau || 0,
        tongTien: values.tongTien || 0,
        ngayGio: Date.now(),
        note: values.note || ''
      }
      firebase.update(`DonHang/${newIndex}`, newDonHang);
      this.props.getLatestData();
  }

  onCancel = (e) => {
      const form = this.form;
      form.resetFields();
      this.setState({
        visible: false,
        isEdit: false,
        DonHangEdit: {}
      });

  }

  saveFormRef = (form) => {
      this.form = form;
  }

  render() {
    return ( 
      <div>
        <Row type='flex' justify='space-between' style={{ height: '100%' }}>
        <Col> 
          <Button type='primary' icon='plus-circle-o' onClick={this.showModal}>Thêm Đơn Hàng</Button>
        </Col>
        <Col>
          <Button type='primary' icon='file-excel'>Xuất file</Button>
        </Col>
        </Row>
        <DonHangForm
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.onCancel}
                onCreate={this.onCreate}
                listKhachHang={this.props.listKhachHang}
                isEdit={this.state.isEdit}
                DonHangEdit={this.state.DonHangEdit}
        />
        <Table dataSource={this.props.dsDonHang} columns={this.columns} pagination={false} />
      </div>
    );
  }
}


export default DonHang;