import { Form,Input, Modal, Row} from 'antd';
import React, { useEffect } from 'react';
import _ from 'lodash';
const FormItem = Form.Item;
const CustomerForm = ({visible, onCancel, onCreate, isEdit, cusEdit}) => {
    const [form] = Form.useForm();
    useEffect(() => {
      if(cusEdit !== null)
      form.setFieldsValue({
        name: cusEdit.name,
        phone: cusEdit.phone,
        note: cusEdit.note
      });
      if(!isEdit)
      {
        form.resetFields();
      }
    }, [cusEdit]);
    return (
      <Modal
        visible={visible}
        title={ isEdit ? 'Edit' : 'Add New'}
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
              label="Name"
              rules={[
                {
                required: true,
                message: 'Please input name!',
                },
              ]}
          >            
          <Input placeholder='Customer name' style={{ width: 420 }} />
          </FormItem>
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem
              name="phone"
              label="Phone"
              rules={[
                {
                required: true,
                message: 'Please input phone!',
                },
              ]}
          >            
          <Input placeholder='Phone number' style={{ width: 420 }} />
          </FormItem>
          </Row>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <FormItem
              name="note"
              label="Note"
          >            
          <Input type="textarea" style={{ width: 420 }} />
          </FormItem>
          </Row>
        </Form>
      </Modal>
    );
}
export default CustomerForm