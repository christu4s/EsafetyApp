import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Input, Alert } from 'antd';
import './App.css';
import { getMenu, getSelectedMenuItem, menus, routes } from './config';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { UserOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { userName } from './constants';
import { MenuTitle, SearchBar } from './utils';
import logo from './assets/logo.jpeg';
import SiteMenuContext, { SiteMenuProvider } from './siteMenuProvider';
import { base_url } from './ajax';


const { Content, Footer, Sider, Header } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
    menus: [],
    search: '',
  };

  onCollapse = collapsed => this.setState({ collapsed });
  redirect = p => {
    var { url } = p.item.props;
    if (!url) return;
    window.location.href = url;
  }

  render() {
    const { collapsed, menus } = this.state;

    const userMenu = (
      <Menu>
        {/* <Menu.Item  key="u1"><a href="/#profile">Profile</a></Menu.Item> */}
        <Menu.Item key="u2"><a href={base_url + "?logout=1"}>Logout</a></Menu.Item>
      </Menu>
    );


    // const selected = getSelectedMenuItem(menus);
    // const handleChange = (event) => {
    //   this.setState({ search: event.target.value });
    // };
    return (
      <SiteMenuContext.Consumer>
        {({menu})=>{
      const selected = getSelectedMenuItem(menu);
      return <Layout>
        <Header className="header">
          <div className="logo" >
            <Link to="/"><img src={logo} alt="Esafety logo" style={{ width: 130 }} /></Link>
          </div>
          <div className="header-right">
            <div style={{ width: 360, paddingLeft: 30 }}>
              {/* <Input type="search" value={this.state.search} onChange={handleChange} allowClear placeholder="search" prefix={<SearchOutlined />} /> */}
              <SearchBar />
            </div>
            <Dropdown overlay={userMenu}>
              <Space><Avatar size="large" icon={<UserOutlined />} /> {userName} <DownOutlined /></Space>
            </Dropdown>
          </div>
        </Header>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width={300}>
            <Menu selectedKeys={selected} className='menu--holder' onClick={this.redirect} mode="inline">
              {customMenu(menu)}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px', padding: 20 }}>
              <Alert message="Notice: This is a test enviroment" type="warning" />
              <Switch>
                {routes.map((v, i) => <Route key={i} {...v} />)}
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>eSafety Portal ©2022 Created by Caspian Digital Solution</Footer>
          </Layout>
        </Layout>
      </Layout>
      }}
      </SiteMenuContext.Consumer>
    );
  }
}

export default withRouter(App);

function customMenu(menus, parent = '') {
  return menus.map((v, i) => {
    var key = parent + '_' + i;
    return v.children ? <Menu.SubMenu key={key} onTitleClick={() => { window.location.href = v.url; }} title={<MenuTitle {...v} />} icon={v.icon}>{customMenu(v.children, i)}</Menu.SubMenu>
      : <Menu.Item key={key} url={v.url} icon={v.icon}><MenuTitle {...v} /></Menu.Item>;
  })
}