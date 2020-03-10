import React, { useContext, useState, useEffect, useRef } from 'react';
import { Form, Icon, Input, Button, Popconfirm, Table, Select, InputNumber, Col, Row} from 'antd';
import _ from 'lodash';
import { firebase, getData } from '../../firebase/firebase';
const FormItem = Form.Item;
const EditableContext = React.createContext();
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const OrderDetails = () =>  {
  const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState(null);
  const [cusID, setCusId] = useState('');
  const [id, setId] = useState('');
  const [note, setNote] = useState('');
  const [sum, setSum] = useState(0);
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(2);
  const [dataSource, setDataSource] = useState([{
    key: "0",
    name: "Edward King 0",
    age: "32",
    address: "London, Park Lane no. 0"
  },
  {
    key: "1",
    name: "Edward King 1",
    age: "32",
    address: "London, Park Lane no. 1"
  }]);

  useEffect(() => {
    Promise.all([
      getData('Customer'),
      getData('Order'),
      getData('Product')]
      ).then(([customers, orders, products]) => {
        setCustomers(customers);
        setProducts(products);
        console.log('get data from firebase')
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
      number: 1,
      total: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count+1);
  };

  const handleSave = row => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData)
  };


  const Columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      width: '30%',
      editable: true,
    },
    {
      title: 'Number',
      dataIndex: 'number',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    }
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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
        handleSave: handleSave,
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

    <Form layout='vertical' ref ={this.formRef} onFinish={this.onFinish}>
          <Row type='flex' justify='left' style={{ height: '100%' }}>
          <div>{user? user.email:''}</div>
          </Row>
          <Row type='flex' justify='left' style={{ height: '100%' }}>
          <div>ID:123</div>
          </Row>
          <Row type='flex' justify='left' style={{ height: '100%' }}>
          <div>Today: {utc}</div> 
          </Row>
          <Row type='flex' justify='left' >  

          <FormItem 
            label='Customer'
            rules={[
              {
                required: true,
              },
            ]}          
          >         
            <Select
              placeholder='Select a Customer'
              onChange={this.onCustomerChange}
              onChange={(value) => setCusId(value)}
              style={{ width: 400 }}
            >
              {
                _.map(customers, cus=> <Select.Option value={cus.cusID}>{cus.name}</Select.Option> )
              }
            </Select>
            </FormItem>
          </Row>
          <Row type='flex' justify='left' style={{ height: '100%' }}>  
            <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            style={{ width: 1000 }}
            />
          </Row>
          <Row type='flex' justify='left' style={{ height: '100%' }}>  
              <Button
              onClick={handleAdd}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Add a row
            </Button>
          </Row>
          <Row type='flex' justify='left' style={{ height: '100%' }}>  
            <FormItem>
                <Input placeholder='Note' style={{ width: 420 }}
                  onChange={(e) => setNote(e.target.value)}
                />
          </FormItem>
          </Row>
          <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" >
            Cancel
          </Button>
          
        </Form.Item>
        </Form>
  </div>
  )
}
export default OrderDetails;

// import React, { useState } from 'react';
// import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';

// const originData = [];

// for (let i = 0; i < 10; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

// const OrderDetails = () => {
//   const [form] = Form.useForm();
//   const [data, setData] = useState(originData);
//   const [editingKey, setEditingKey] = useState('');

//   const isEditing = record => record.key === editingKey;

//   const edit = record => {
//     form.setFieldsValue({ ...record });
//     setEditingKey(record.key);
//   };

//   const cancel = () => {
//     setEditingKey('');
//   };

//   const save = async key => {
//     try {
//       const row = await form.validateFields();
//       const newData = [...data];
//       const index = newData.findIndex(item => key === item.key);

//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, { ...item, ...row });
//         setData(newData);
//         setEditingKey('');
//       } else {
//         newData.push(row);
//         setData(newData);
//         setEditingKey('');
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };

//   const columns = [
//     {
//       title: 'name',
//       dataIndex: 'name',
//       width: '25%',
//       editable: true,
//     },
//     {
//       title: 'age',
//       dataIndex: 'age',
//       width: '15%',
//       editable: true,
//     },
//     {
//       title: 'address',
//       dataIndex: 'address',
//       width: '40%',
//       editable: true,
//     },
//     {
//       title: 'operation',
//       dataIndex: 'operation',
//       render: (text, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <a
//               href="javascript:;"
//               onClick={() => save(record.key)}
//               style={{
//                 marginRight: 8,
//               }}
//             >
//               Save
//             </a>
//             <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
//               <a>Cancel</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <a disabled={editingKey !== ''} onClick={() => edit(record)}>
//             Edit
//           </a>
//         );
//       },
//     },
//   ];
//   const components = {
//     body: {
//       cell: EditableCell,
//     },
//   };
//   const mergedColumns = columns.map(col => {
//     if (!col.editable) {
//       return col;
//     }

//     return {
//       ...col,
//       onCell: record => ({
//         record,
//         inputType: col.dataIndex === 'age' ? 'number' : 'text',
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });
//   return (
//     <Form form={form} component={false}>
//       <Table
//         components={components}
//         bordered
//         dataSource={data}
//         columns={mergedColumns}
//         rowClassName="editable-row"
//         pagination={{
//           onChange: cancel,
//         }}
//       />
//     </Form>
//   );
// };

// export default OrderDetails;