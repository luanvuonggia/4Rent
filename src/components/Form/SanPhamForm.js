import { Form, Icon, Input, Button, Modal, Switch, Select, InputNumber, Col, Row} from 'antd';
import React, { Component } from 'react';
import _ from 'lodash';
const FormItem = Form.Item;
const SanPhamForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, isEdit, SanPhamEdit } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={ isEdit ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}
        okText={ isEdit ? 'Cập nhật' : 'Thêm' }
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout='vertical'>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem>
            {getFieldDecorator('ten', { initialValue: isEdit? SanPhamEdit.tenSP : null },{
              rules: [{ required: true, message: 'Tên sản phẩm không được bỏ trống!' }]})(
              <Input placeholder='Nhập tên sản phẩm' style={{ width: 420 }} />
            )}
          </FormItem>
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem>
            {getFieldDecorator('gia', { initialValue: isEdit? SanPhamEdit.gia : null },{
              rules: [{ required: true, message: 'Giá tiền không được bỏ trống!' }]})(
              <InputNumber placeholder='Nhập giá tiền' style={{ width: 420 }} />
            )}
          </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
);
export default SanPhamForm