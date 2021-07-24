import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Input } from 'antd';
import './App.css';
import { getSelectedMenuItem, menus, routes } from './config';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { UserOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';

const { Content, Footer, Sider, Header } = Layout;

const logo = 'http://esafety.enkuire.com/wp-content/uploads/2021/06/E-safety-02.png';

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => this.setState({ collapsed });
  redirect = p =>{ 
    var {url} = p.item.props;
    if(!url) return;
    window.location.href = url;
  }
  
  render() { 
    const { collapsed } = this.state;

    const userMenu = (
      <Menu>
        <Menu.Item  key="u1"><a href="/#profile">Profile</a></Menu.Item>
        <Menu.Item key="u2">Logout</Menu.Item>
        <Menu.Item  key="u3"><a href="/#select-account">SelectAccount</a></Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <Header className="header">
          <div className="logo" >
              <Link to="/"><img src={logo} alt="Esafety logo" style={{width: 130}} /></Link>
          </div>
          <div className="header-right">
            <div style={{width: 360, paddingLeft: 30}}>
              <Input type="search" allowClear placeholder="search" prefix={<SearchOutlined />} />
            </div>
            <Dropdown overlay={userMenu}>
                <Space><Avatar size="large" icon={<UserOutlined />} /> Admin <DownOutlined /></Space>
            </Dropdown>
          </div>
        </Header>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={300}>
          <Menu selectedKeys={getSelectedMenuItem()} className='menu--holder' onClick={this.redirect} mode="inline">
            {customMenu(menus)}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px', padding: 20 }}>
            <Switch>
              {routes.map((v, i) => <Route key={i} {...v} />)}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Esafety Dashboard ©2021 Created by Caspian Digital Solution</Footer>
        </Layout>
      </Layout>
    </Layout>
    );
  }
}

export default withRouter(App);

function customMenu(menus, parent = ''){
  return menus.map((v,i)=> {
    var key = parent + '_'  + i; 
    return v.children ? <Menu.SubMenu key={key} title={<a href={v.url}>{v.title}</a>} icon={v.icon}>{customMenu(v.children, i)}</Menu.SubMenu> 
    : <Menu.Item key={key} url={v.url} icon={v.icon}>{v.title}</Menu.Item>;
  })
}