import { Form, Icon, Input, Button, Modal, Switch, Select, InputNumber, Col, Row} from 'antd';
import React, { Component } from 'react';
import _ from 'lodash';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const DonHangForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, listKhachHang, isEdit, DonHangEdit } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={ isEdit ? 'Sửa Đơn Hàng' : 'Thêm Đơn Hàng'}
        okText={ isEdit ? 'Cập nhật' : 'Thêm' }
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout='vertical'>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem label='Tên'>
            {getFieldDecorator('khachHang', {initialValue: isEdit? DonHangEdit.cusID : null }, {
              rules: [{ required: true, message: 'Chọn một khách hàng!' }]})(
              <Select style={{ width: 420 }}
                showSearch
              >
                {
                  _.map(listKhachHang, (khach) => <Option value={khach.cusID}>{khach.ten}</Option>)
                }
              </Select>
            )}

          </FormItem>
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem label='Tổng Cộng'>
            {getFieldDecorator('tongTien', {initialValue: isEdit? DonHangEdit.tongTien : null })(
              <InputNumber placeholder='Nhập Tổng Tiền' style={{ width: 420 }} />
            )}
          </FormItem>
          <FormItem label='Nợ ban đầu'>
            {getFieldDecorator('noBanDau', {initialValue: isEdit? DonHangEdit.noBanDau : null })(
              <InputNumber placeholder='Số Tiền Nợ' style={{ width: 420 }} />
            )}
          </FormItem>
          {
            isEdit &&
            <FormItem label='Còn nợ'>
            {getFieldDecorator('conNo', { initialValue: DonHangEdit.conNo })(
              <InputNumber placeholder='Còn Nợ' style={{ width: 420 }} />
            )}
          </FormItem>
          }
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem label='Ghi chú'>
            {getFieldDecorator('note', {initialValue: isEdit? DonHangEdit.note : null })(
              <TextArea placeholder='Ghi chú' style={{ width: 420 }} />
            )}
          </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
);
export default DonHangForm