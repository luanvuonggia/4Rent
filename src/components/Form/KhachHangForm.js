import { Form, Icon, Input, Button, Modal, Switch, Select, InputNumber, Col, Row} from 'antd';
import React, { Component } from 'react';
import _ from 'lodash';
const FormItem = Form.Item;
const KhachHangForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, isEdit, KhachHangEdit  } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={ isEdit ? 'Sửa Khách Hàng' : 'Thêm Khách Hàng'}
        okText={ isEdit ? 'Cập nhật' : 'Thêm' }
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem>
            {getFieldDecorator('ten', { initialValue: isEdit? KhachHangEdit.ten : null },{
              rules: [{ required: true, message: 'Tên khách hàng không được bỏ trống!' }]})(
              <Input placeholder="Nhập tên khách hàng" style={{ width: 420 }} />
            )}
          </FormItem>
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem>
            {getFieldDecorator('sdt', { initialValue: isEdit? KhachHangEdit.sdt : null })(
              <Input placeholder="Nhập SĐT" style={{ width: 420 }} />
            )}
          </FormItem>
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem>
            {getFieldDecorator('note', { initialValue: isEdit? KhachHangEdit.note : null })(
              <Input placeholder="Ghi chú" style={{ width: 420 }} />
            )}
          </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
);
export default KhachHangForm