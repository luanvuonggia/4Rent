import React, { useState } from 'react';
import { Table, message, Button, Divider, Popconfirm, Tag } from 'antd';
import { firebase } from '../../firebase';
import _ from 'lodash';
import ProductForm from '../Form/ProductForm'

const success = () => {
  message.success('Success!')
};

const Product = props => {
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [productEdit, setProductEdit] = useState(null);
  const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Price',
  dataIndex: 'price',
  key: 'price',
},  {
  title: 'In Stock',
  dataIndex: 'inStock',
  key: 'inStock',
  // render: available => (
  //   <Tag color={available? 'green' : 'red'}>
  //       {_.toString(available)}
  //   </Tag>
  // )
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a onClick={()=>onUpdate(record.productID)}>Update</a>
      <Divider type='vertical' />
      <Popconfirm title='Delete this product?' onConfirm={() => onDelete(record.productID)} okText='Ok' cancelText='Cancel'>
      <a>Delete</a>
      </Popconfirm>
    </span>
  )}];

  const showModal = () => {
    setVisible(true);
  }

  const onDelete = (productID) => {
    firebase.update(`Product/${productID}`, null);
    props.getLatestData();
  }

  const onUpdate = (productID) => {
    setIsEdit(true);
    setProductEdit(_.find(props.dsProduct, ['productID', productID]));
    setVisible(true);
    
  }

  const onCreate = (values) => {
  
        firebase.getLastIndex('Product').then((lastIndex) => addProduct(lastIndex, values))
        success()
        setVisible(false);

  }

  const addProduct = (lastIndex, values) => {
      let newIndex = parseInt(lastIndex) + 1;
      if(isEdit) {
        newIndex = productEdit.productID;
      }
      let newProduct = {   
        name: values.name,
        quantity: values.quantity,
        inStock: values.quantity,
        price: values.price.number,
        status: 'create',
        productID: newIndex
      }
      firebase.update(`Product/${newIndex}`, newProduct);
      props.getLatestData();
  }

  const onCancel = (e) => {
    setVisible(false);
    setIsEdit(false);
    setProductEdit(null);

  }


    return (      
        <div>
        <ProductForm
                visible={visible}
                onCancel={onCancel}
                onCreate={onCreate}
                isEdit={isEdit}
                ProductEdit={productEdit}
        />
        <Button type='primary' onClick={showModal}>Add Product</Button> 
        <Table dataSource={props.dsProduct} columns={columns} />
      </div>
    );
}


export default Product;