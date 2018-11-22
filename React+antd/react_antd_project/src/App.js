import React, { Component } from 'react';
import './App.css';
import home from './content/home';
import guang_gao from './content/guang_gao';
import add from './content/Add';
import eidt from './content/Eidt';
import category_home from './content/category_home';
import category_add from './content/category_add';
import category_edit from './content/category_edit';
import order_home from './content/order_home';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'

const {  Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

  render() {
    return (
        <BrowserRouter>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="logo" />

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                    <Menu.Item key="1">
                      <Link to="/">
                        <Icon type="desktop" />
                        <span>首页</span>
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <Link to="/order_home">
                            <Icon type="desktop" />
                            <span>订单管理</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" /><span>广告</span></span>}
                    >
                        <Menu.Item key="3">
                            <Link to="/guang_gao">广告列表！</Link>
                        </Menu.Item>

                        <Menu.Item key="4">
                            <Link to="/category_home">
                            广告分类！
                            </Link>
                        </Menu.Item>

                    </SubMenu>

                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '0 16px' }}>
                    <Switch>
                        <Route exact path="/" component={home} />
                        <Route exact path="/guang_gao" component={guang_gao} />
                        <Route exact path="/add" component={add} />
                        <Route exact path="/eidt" component={eidt} />
                        <Route exact path="/category_home" component={category_home} />
                        <Route exact path="/category_add" component={category_add} />
                        <Route exact path="/category_edit" component={category_edit} />
                        <Route exact path="/order_home" component={order_home} />
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
          </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
