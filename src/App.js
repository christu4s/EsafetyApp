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
  redirect = item =>{
    var menu = menus[item.key];
    if(!menu || !menu.url) return;
    window.location.href = menu.url;
  }
  
  render() { 
    const { collapsed } = this.state;

    const userMenu = (
      <Menu>
        <Menu.Item  key="u1"><a href="/#profile">Profile</a></Menu.Item>
        <Menu.Item key="u2">Logout</Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <Header className="header">
          <div className="logo" >
              <Link to="/"><img src={logo} alt="Esafety logo" style={{width: 100}} /></Link>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', width: 'calc(100vw - 150px)'}}>
            <div style={{width: 500, paddingLeft: 30}}>
              <Input type="search" allowClear placeholder="search" prefix={<SearchOutlined />} />
            </div>
            <Dropdown overlay={userMenu}>
                <Space><Avatar size="large" icon={<UserOutlined />} /> Admin <DownOutlined /></Space>
            </Dropdown>
          </div>
        </Header>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Menu selectedKeys={[getSelectedMenuItem()]} onSelect={this.redirect} mode="inline">
            <CustomMenu menus={menus} />
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px', padding: 20 }}>
            <Switch>
              {routes.map((v, i) => <Route key={i} {...v} />)}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>dXS Dashboard ©2021 Created by Caspian Digital Solution</Footer>
        </Layout>
      </Layout>
    </Layout>
    );
  }
}

export default withRouter(App);

function CustomMenu({menus = [], parent = ''}){
  return menus.map((v,i)=> 
    v.children ? <Menu.SubMenu key={i} icon={v.icon}><CustomMenu menus={v.children} parent={i} /></Menu.SubMenu> 
    : <Menu.Item key={parent + '_'  + i} icon={v.icon}>{v.title}</Menu.Item>
  )
}