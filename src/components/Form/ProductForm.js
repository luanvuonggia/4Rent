import { Form, Icon, Input, Button, Modal, Switch, Select, InputNumber, Col, Row} from 'antd';
import React, { Component } from 'react';
import _ from 'lodash';
const FormItem = Form.Item;
class PriceInput extends React.Component {
  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    this.triggerChange({ number });
  };

  triggerChange = changedValue => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue,
      });
    }
  };

  render() {
    const { size, value } = this.props;
    return (
      <span>
        <Input
          type='text'
          size={size}
          value={value.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
      </span>
    );
  }
}
const ProductForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, isEdit, ProductEdit, checkPrice} = props;
    const { getFieldDecorator } = form;
  
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
                <PriceInput />
            )}
          </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
);
export default ProductForm