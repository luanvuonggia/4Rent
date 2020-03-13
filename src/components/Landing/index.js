import React, { useState } from 'react';
import landing from '../../img/landing.jpg';
import mac from '../../img/mac.png';
import { Row, Col, Menu } from 'antd';
import './landing.css'


function LandingPage()  {
  const [current, setCurrent] = useState('home');

  const handleClick = e => {
    setCurrent(e.key)
  };
  return (
    <div className="Landing" style={{backgroundImage: `url(${landing})` }}>
      <div className="Landing-content">
        <Row>
          <Col span={12}>
          </Col>
          <Col span={12}>
          <Menu 
          onClick={handleClick} 
          selectedKeys={[current]} 
          mode="horizontal" 
          style={{background: 'rgba(0, 0, 0, 0.05)', marginTop:-38}}>
          <Menu.Item key="home">    
          Home
        </Menu.Item>
        <Menu.Item key="about">
          About
        </Menu.Item>
        <Menu.Item key="contact">
          Contact
        </Menu.Item>
        <Menu.Item key="blog">
          Blog
        </Menu.Item>
      </Menu>
          </Col>
        </Row>
        <Row>
        <Col span={12}>   
          <h1 className='h1-content'>4 RENT</h1>
          <h2 className='h2-content'>Just add some test here to make this web look professional and expensive!</h2>
        </Col>
        <Col span={12}>
          <img className='img' src={mac} alt="macbook"/>
        </Col>
        </Row>
      </div>
  </div>
  )
}
export default LandingPage;
