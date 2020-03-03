import { Form,Input, Modal, Row} from 'antd';
import React, { Component } from 'react';
import _ from 'lodash';
const FormItem = Form.Item;
const KhachHangForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, isEdit, cusEdit } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={ isEdit ? 'Edit' : 'Add New'}
        okText={ isEdit ? 'Update' : 'Add' }
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem>
            {getFieldDecorator('name', { initialValue: isEdit? cusEdit.name : null },{
              rules: [{ required: true, message: 'Name is required!' }]})(
              <Input placeholder='Customer name' style={{ width: 420 }} />
            )}
          </FormItem>
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem>
            {getFieldDecorator('phone', { initialValue: isEdit? cusEdit.phone : null })(
              <Input placeholder='phone number' style={{ width: 420 }} />
            )}
          </FormItem>
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem>
            {getFieldDecorator('note', { initialValue: isEdit? cusEdit.note : null })(
              <Input placeholder='Note' style={{ width: 420 }} />
            )}
          </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
);
export default KhachHangForm