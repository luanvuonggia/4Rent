import { Form, Input, Modal, InputNumber, Row} from 'antd';
import React, { Component } from 'react';
import _ from 'lodash';
const FormItem = Form.Item;
const ProductForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, isEdit, ProductEdit, checkPrice} = props;
    const { getFieldDecorator } = form;
    const handleNumberChange = (e) => {
      const number = _.toNumber(e);
      if (!_.isNumber(number)) {
        return;
      }
    }
    return (
      <Modal
        visible={visible}
        title={ isEdit ? 'Edit Product' : 'Add Product'}
        okText={ isEdit ? 'Update' : 'Add' }
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout='vertical'>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem>
            {getFieldDecorator('name', { initialValue: isEdit? ProductEdit.name : null },{
              rules: [{ required: true, message: 'Name is required!' }]})(
              <Input placeholder='Input product name' style={{ width: 420 }} />
            )}
          </FormItem>
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem>
            {getFieldDecorator('price', { initialValue: isEdit? ProductEdit.price : 0 },{
              rules: [{ validator: checkPrice }]})(
                <InputNumber 
                placeholder='Input product price'
                style={{ width: 420 }}
                onChange={handleNumberChange}
                />
            )}
          </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
);
export default ProductForm