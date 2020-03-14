import React, { useState, useEffect } from 'react';
import { Form, message, Button, Popconfirm, Table, Select, InputNumber, Col, Row} from 'antd';
import _ from 'lodash';
import { firebase, getData, update} from '../../firebase/firebase';
const FormItem = Form.Item;
const { Option } = Select;

const OrderDetails = () =>  {
  const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState(null);
  const [cusID, setCusId] = useState('');
  const [id, setId] = useState('');
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const [dataSource, setDataSource] = useState([
   ]);

  useEffect(() => {
    Promise.all([
      getData('Customer'),
      getData('Order'),
      getData('Product')]
      ).then(([customers, orders, products]) => {
        setCustomers(customers);
        setProducts(products);
        const lastID = (orders && _.last(Object.keys(orders))) || -1
        setId(_.toNumber(lastID)+1);
    })
  }, []);
  const handleDelete = key => { 
    const data = [...dataSource];
    setDataSource(data.filter(item => item.key !== key));
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      product: 'new',
      quantity: 1,
      price: 0,
      amount: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count+1);
  };

  // const handleSave = row => {
  //   const newData = [...dataSource];
  //   const index = newData.findIndex(item => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, { ...item, ...row });
  //   setDataSource(newData)

  // };
  const success = () => {
    message.success('Success')
  };

  const handleChangeProduct = (value, key) => {
    const indexPro = _.findIndex(dataSource, ['key', key]);
    const product = _.find(products, ['productID', value]);
    let newData = {
      key: key,
      product: value,
      quantity: 1,
      price: product.price,
      amount:  product.price,
    };
    const newDataSource = _.clone(dataSource);
    newDataSource[indexPro] = newData;
    setDataSource(newDataSource); 
  }

  const handleChangeQuantity = (value, record) =>{
    const indexPro = _.findIndex(dataSource, ['key', record.key]);
    const newDataSource = _.clone(dataSource);
    newDataSource[indexPro].quantity = value;
    newDataSource[indexPro].amount = value * record.price;
    setDataSource(newDataSource)
  }

  const onFinish = () => {
    let newOrder= {
      cusID: cusID,
      id: id,
      date: utc,
      total: _.sumBy(dataSource, 'amount'),
      details: dataSource
    }
    update(`Order/${id}`, newOrder);
    success()

  }
  const Columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      width: '30%',
      render: (text, record) => (
        <Select style={{width:'100%'}} onChange={(value)=>handleChangeProduct(value, record.key)}>
          {
            _.map(products, (product)=> <Option value={product.productID}>{product.name}</Option>)
          }
        </Select>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (text, record) => (
        <InputNumber min={1} defaultValue={1} style={{width:'100%'}} 
          onChange={(value)=>handleChangeQuantity(value, record)}
        />         
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',

    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    }
  ];

  const columns = Columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  firebase.auth().onAuthStateChanged(function(user) { //get current user
    if (user) {
        setUser(user);
    }
});
  return (
  <div>
    <Row type='flex' justify='center' 
      style={{ height: '100%', width: '100%',backgroundColor: '#829988'}}
    >
      <h1 style={{color:'#2c2b61d9'}}>Invoice</h1>
    </Row>
    <Form layout='vertical' onFinish={onFinish}>
          <Row type='flex' justify='left' style={{paddingTop: 15}} >  
          <Col span={12}>
          <FormItem 
            name="customer"
            rules={[
              {
                required: true,
                message: 'Please select customer!'
              },
            ]}          
          >         
            <Select
              placeholder='Select a Customer'
              onChange={(value) => setCusId(value)}
              style={{ width: 400 }}
            >
              {
                _.map(customers, cus=> <Select.Option value={cus.cusID}>{cus.name}</Select.Option> )
              }
            </Select>
            </FormItem>
            </Col>
            <Col span ={6}>
            </Col>
            <Col span ={6}>
              <Button
                onClick={handleAdd}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
              >
                Add row
              </Button>
            </Col>
          </Row>
          <Row type='flex' justify='left' style={{ height: '100%' }}>  
            <Table
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            style={{ width: 1000 }}
            pagination={false}
            />
          </Row>
          
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
              <h2>Total: {_.sumBy(dataSource, 'amount')}$</h2>
          </Row>
          <Form.Item>
          <Row type='flex' justify='center' style={{ height: '100%' }}>  
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button htmlType="button" >
            Clear
          </Button>
          </Row>
        </Form.Item>
        </Form>
  </div>
  )
}
export default OrderDetails;