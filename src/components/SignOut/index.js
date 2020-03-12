import React from 'react';
import { Menu, Dropdown, Avatar  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { auth } from '../../firebase';
const menu = (
  <Menu>
    <Menu.Item>
      <a onClick={auth.doSignOut}>
        SignOut
      </a>
    </Menu.Item>
  </Menu>
);
const SignOutButton = () =>
<Dropdown overlay={menu} placement="bottomLeft">
    <Avatar
      style={{
        backgroundColor: '#87d068',
      }}
      icon={<UserOutlined />}
    >
    </Avatar>
</Dropdown>
export default SignOutButton;
