import { Layout, Menu, Breadcrumb } from 'antd';
import './SelectAccount.css';
import React, { useState }  from 'react';
//import { Layout, Menu, Avatar, Dropdown, Space, Input } from 'antd';
import './../../App.css';
import { Row, Col, Divider } from 'antd';
import bfi from '../../assets/bfi.png';
import technipfmc from '../../assets/technipfmc.png';
import thyssenkrupp from '../../assets/thyssenkrupp.png';
import total from '../../assets/total.png';


const { Header, Content, Footer } = Layout;

const style = {   width: '260px',
  height: '155px',
  margin: '21px 23px 25px 0',
  padding: '14px 35px 14px',
  'object-fit': 'contain',
  'border-radius': '4px',
  'border': 'solid 1px #555555',
  'background-color': '#fff'
   };

export const SelectAccount = () => {
    return (
  <Layout>    
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
     
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      
    <Row gutter={[16, 24]}>
      <Col className="gutter-row" span={8}>
        <div style={style}>
        <img class="bfi" src={bfi} />
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
        <img class="bfi" src={technipfmc} />
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
        <img class="bfi" src={technipfmc} />
        </div>
      </Col>
      
      <Col className="gutter-row" span={8}>
        <div style={style}>
        <img class="total" src={total} />
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
        <img class="thyssenkrupp" src={thyssenkrupp} />
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
        <img class="thyssenkrupp" src={thyssenkrupp} />
        </div>
      </Col>
    </Row>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}></Footer>
  </Layout>
    );
};
