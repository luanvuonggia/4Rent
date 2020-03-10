import { Form, Input, Modal, InputNumber, Row} from 'antd';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
const FormItem = Form.Item;

const PriceInput = ({ value = {}, onChange, defaultValue }) => {
  const [number, setNumber] = useState(0);

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        number,
        ...value,
        ...changedValue,
      });
    }
  };

  const onNumberChange = e => {
    const newNumber = parseInt(e.target.value || 0, 10);

    if (Number.isNaN(number)) {
      return;
    }

    // if (!(number in value)) {
    //   setNumber(newNumber);
    // }

    triggerChange({
      number: newNumber,
    });
  };


  return (
    <span>
      <Input
        type="text"
        label='Price'
        value={value.number || defaultValue}
        onChange={onNumberChange}
        style={{
          width: 420,
          marginRight: 8,
        }}
      />
    </span>
  );
};

const ProductForm = ({visible, onCancel, onCreate, isEdit, ProductEdit}) => {
    const [form] = Form.useForm();
    const checkPrice = (rule, value) => {
      if (value.number > 0) {
        return Promise.resolve();
      }
  
      return Promise.reject('Number must be greater than zero!');
    };
    useEffect(() => {
      if(ProductEdit !== null)
      form.setFieldsValue({
        name: ProductEdit.name,
        price: ProductEdit.price,
        quantity: ProductEdit.quantity
      });
      if(!isEdit)
      {
        form.resetFields();
      }
    }, [ProductEdit]);
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
        onCancel={()=>{
          form.resetFields()
          onCancel()}}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form 
          form={form} 
          layout='vertical'
          name='customer_form'        
        >
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem
              name="name"
              label='Product name'
              rules={[
                {
                required: true,
                message: 'Please input product name!',
                },
              ]}
          >            
          <Input  style={{ width: 420 }} />
          </FormItem>
          
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>
          <FormItem
              name='quantity'
              label='Quantity'
              rules={[{
                required: true,
                message: 'Please input a number!',
              },]}
          >            
          <InputNumber min={0} style={{ width: 420 }}/>
          </FormItem>
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>
          <FormItem
              name='price'
              label='Unit Price ($)'
              rules={[{ validator: checkPrice }]}
          >            
          <PriceInput defaultValue={isEdit? ProductEdit.price : 0} />
          </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }

export default ProductForm